package com.flightbooking.backend.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

import com.flightbooking.backend.Model.RedisToken;
import com.flightbooking.backend.Model.RefreshTokenInfo;
import com.flightbooking.backend.Repository.RedisTokenRepository;
import com.flightbooking.backend.Repository.RefreshTokenInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@RequiredArgsConstructor
@Service
public class JwtService {
    private final RedisTokenRepository redisTokenRepository;
    private final RefreshTokenInfoRepository refreshTokenInfoRepository;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    public String generateRefreshToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority())
                .orElse("USER");

        return createRefreshToken(userDetails.getUsername(), role);

    }

    private String createRefreshToken(String subject, String role) {
        return Jwts.builder()
                .setSubject(subject)
                .setId(UUID.randomUUID().toString())
                .claim("role", role)
                .claim("type", "refresh")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 2592000000L))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority())
                .orElse("USER");

        return createToken(userDetails.getUsername(), role);
    }

    private String createToken(String subject, String role) {
        return Jwts.builder()
                .setSubject(subject)
                .setId(java.util.UUID.randomUUID().toString())
                .claim("role", role)
                .claim("type", "access")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))

                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractJwtId(String token) {
        return extractClaim(token, Claims::getId);
    }

    public String extractTokenType(String token) {
        return extractClaim(token, claims -> claims.get("type", String.class));
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String tokenType = extractTokenType(token);
        if (!"access".equals(tokenType)) {
            return false;
        }

        String jwtId = extractJwtId(token);
        if (jwtId != null) {
            Optional<RedisToken> redisToken = redisTokenRepository.findById(jwtId);
            if (redisToken.isPresent()) {
                throw new RuntimeException("invalid token");
            }
        }

        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isRefreshTokenValid(String refreshToken) {
        try {
            String tokenType = extractTokenType(refreshToken);
            if (!"refresh".equals(tokenType)) {
                return false;
            }

            if (isTokenExpired(refreshToken)) {
                return false;
            }

            String jwtId = extractJwtId(refreshToken);
            if (jwtId == null) {
                return false;
            }

            Optional<RefreshTokenInfo> tokenInfo = refreshTokenInfoRepository.findById(jwtId);

            return tokenInfo.isPresent();

        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Date extractIssuedAt(String token) {
        return extractClaim(token, Claims::getIssuedAt);
    }
}
