package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.LoginResponseDTO;
import com.flightbooking.backend.DTO.RefreshTokenRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.flightbooking.backend.DTO.LoginRequestDTO;
import com.flightbooking.backend.DTO.RegisterRequestDTO;
import com.flightbooking.backend.Service.LoginService;
import com.flightbooking.backend.Service.RegisterService;
import com.flightbooking.backend.Service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {

    private final RegisterService registerService;
    private final LoginService loginService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequestDTO request) {
        registerService.register(request);
        return ResponseEntity.ok("Register success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            return ResponseEntity.ok(loginService.Login(loginRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tên đăng nhập hoặc mật khẩu");
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Authorization header");
        }

        try {
            String token = authHeader.substring(7);
            loginService.Logout(token);
            return ResponseEntity.ok("Logout success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Logout failed");
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDTO request) {
        if (request.getRefreshToken() == null || request.getRefreshToken().trim().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Refresh token is required");
        }

        try {
            LoginResponseDTO response = loginService.refreshToken(request.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid or expired refresh token");
        }
    }

    @GetMapping("/demo")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Hello! Bạn đã xác thực thành công.");
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("Hello Admin! Bạn có quyền truy cập endpoint này.");
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserInfoDTO userInfo = userService.getUserInfo(userDetails.getUsername());
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
