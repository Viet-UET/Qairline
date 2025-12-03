package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.LoginResponseDTO;
import com.flightbooking.backend.Model.RedisToken;
import com.flightbooking.backend.Model.RefreshTokenInfo;
import com.flightbooking.backend.Repository.RedisTokenRepository;
import com.flightbooking.backend.Repository.RefreshTokenInfoRepository;

import io.jsonwebtoken.Jwt;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flightbooking.backend.DTO.LoginRequestDTO;

import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RedisTokenRepository redisTokenRepository;
    private final RefreshTokenInfoRepository refreshTokenInfoRepository;
    private final UserDetailsService userDetailsService;

    public LoginResponseDTO Login(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        String refreshTokenId = jwtService.extractJwtId(refreshToken);
        RefreshTokenInfo tokenInfo = new RefreshTokenInfo(
                refreshTokenId,
                userDetails.getUsername(),
                2592000L // 30 days in seconds
        );
        refreshTokenInfoRepository.save(tokenInfo);

        return new LoginResponseDTO(token, refreshToken);
    }

    public void Logout(String token) {
        String id = jwtService.extractJwtId(token);
        Date issue = jwtService.extractIssuedAt(token);
        Date expire = jwtService.extractExpiration(token);

        if (expire.before(new Date())) {
            return;
        }

        // Blacklist access token
        RedisToken redisToken = new RedisToken(id, expire.getTime() - issue.getTime());
        redisTokenRepository.save(redisToken);

        // Xóa tất cả refresh tokens của user
        String username = jwtService.extractUsername(token);
        List<RefreshTokenInfo> userTokens = refreshTokenInfoRepository.findByUsername(username);
        for (RefreshTokenInfo tokenInfo : userTokens) {
            refreshTokenInfoRepository.deleteById(tokenInfo.getJwtId());
        }
    }

    public LoginResponseDTO refreshToken(String refreshToken) {
        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String username = jwtService.extractUsername(refreshToken);
        String oldRefreshTokenId = jwtService.extractJwtId(refreshToken);

        if (oldRefreshTokenId != null) {
            refreshTokenInfoRepository.deleteById(oldRefreshTokenId);
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Tạo cả access token và refresh token mới (rotation)
        String newAccessToken = jwtService.generateToken(userDetails);
        String newRefreshToken = jwtService.generateRefreshToken(userDetails);

        // Lưu refresh token mới vào Redis
        String newRefreshTokenId = jwtService.extractJwtId(newRefreshToken);
        RefreshTokenInfo tokenInfo = new RefreshTokenInfo(
                newRefreshTokenId,
                userDetails.getUsername(),
                2592000L // 30 days in seconds
        );
        refreshTokenInfoRepository.save(tokenInfo);

        return new LoginResponseDTO(newAccessToken, newRefreshToken);
    }

}
