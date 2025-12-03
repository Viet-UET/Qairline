package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.ForgotPasswordRequestDTO;
import com.flightbooking.backend.DTO.LoginResponseDTO;
import com.flightbooking.backend.DTO.RefreshTokenRequestDTO;
import com.flightbooking.backend.DTO.ResetPasswordRequestDTO;
import com.flightbooking.backend.DTO.UpdateUserRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import com.flightbooking.backend.DTO.LoginRequestDTO;
import com.flightbooking.backend.DTO.RegisterRequestDTO;
import com.flightbooking.backend.Service.LoginService;
import com.flightbooking.backend.Service.PasswordResetService;
import com.flightbooking.backend.Service.RegisterService;
import com.flightbooking.backend.Service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final RegisterService registerService;
    private final LoginService loginService;
    private final UserService userService;
    private final PasswordResetService passwordResetService;

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
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                loginService.Logout(token);
                return ResponseEntity.ok("Logout success");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Authorization header");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed: " + e.getMessage());
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

    @PutMapping("/update-me")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid UpdateUserRequestDTO updateRequest) {
        try {
            UserInfoDTO updatedUserInfo = userService.updateUserInfo(userDetails.getUsername(), updateRequest);
            return ResponseEntity.ok(updatedUserInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to update user information: " + e.getMessage());
        }
    }

    /**
     * API Quên mật khẩu - Bước 1: Gửi email đặt lại mật khẩu
     * Endpoint: POST /forgot-password
     * Body: { "email": "user@example.com" }
     * 
     * @param request DTO chứa email
     * @return Thông báo thành công (không tiết lộ email có tồn tại hay không)
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordRequestDTO request) {
        try {
            passwordResetService.initiatePasswordReset(request.getEmail());

            // Luôn trả về message chung để không lộ thông tin email có tồn tại hay không
            return ResponseEntity.ok(new HashMap<String, String>() {
                {
                    put("message",
                            "Nếu email tồn tại trong hệ thống, link đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.");
                }
            });
        } catch (RuntimeException e) {
            // Lỗi gửi email
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error during password reset initiation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.");
        }
    }

    /**
     * API Quên mật khẩu - Bước 2: Đặt lại mật khẩu bằng token
     * Endpoint: POST /reset-password
     * Body: {
     * "token": "uuid-token-from-email",
     * "newPassword": "NewPass123",
     * "confirmPassword": "NewPass123"
     * }
     * 
     * @param request DTO chứa token và mật khẩu mới
     * @return Thông báo thành công hoặc lỗi
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordRequestDTO request) {
        try {
            // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
            if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Mật khẩu và xác nhận mật khẩu không khớp");
            }

            // Đặt lại mật khẩu
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());

            return ResponseEntity.ok("Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi đặt lại mật khẩu");
        }
    }

}
