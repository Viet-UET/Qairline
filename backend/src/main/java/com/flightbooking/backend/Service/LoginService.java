package com.flightbooking.backend.Service;

import com.flightbooking.backend.DTO.LoginResponseDTO;
import com.flightbooking.backend.Model.RedisToken;
import com.flightbooking.backend.Repository.RedisTokenRepository;
import io.jsonwebtoken.Jwt;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.flightbooking.backend.DTO.LoginRequestDTO;

import lombok.RequiredArgsConstructor;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RedisTokenRepository redisTokenRepository;

    public LoginResponseDTO Login(LoginRequestDTO loginRequestDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return new LoginResponseDTO(token,refreshToken);
    }


    public void Logout(String token) {
        String id = jwtService.extractJwtId(token);
        Date issue = jwtService.extractIssuedAt(token);
        Date expire = jwtService.extractExpiration(token);

        if (expire.before(new Date())) {
            return;
        }

        RedisToken redisToken = new RedisToken(id, expire.getTime() - issue.getTime());

        redisTokenRepository.save(redisToken);

    }

}
