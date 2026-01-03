package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.*;
import com.flightbooking.backend.Service.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "API xác thực người dùng")
public class AuthController {
    private final RegisterService registerService;
    private final LoginService loginService;
    private final PasswordResetService passwordResetService;

    @Operation(summary = "Đăng ký tài khoản mới", description = "Đăng ký người dùng mới bằng email và password")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequestDTO request) {
        registerService.register(request);
        return ResponseEntity.ok("Register success");
    }

    @Operation(summary = "Đăng nhập", description = "Đăng nhập bằng email và password để nhận access token và refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đăng nhập thành công"),
            @ApiResponse(responseCode = "401", description = "Sai tên đăng nhập hoặc mật khẩu")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            return ResponseEntity.ok(loginService.Login(loginRequestDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tên đăng nhập hoặc mật khẩu");
        }

    }

    @Operation(summary = "Đăng xuất", description = "Đăng xuất và vô hiệu hóa access token hiện tại")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đăng xuất thành công"),
            @ApiResponse(responseCode = "400", description = "Header Authorization không hợp lệ"),
            @ApiResponse(responseCode = "500", description = "Lỗi server khi đăng xuất")
    })
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

    @Operation(summary = "Làm mới token", description = "Sử dụng refresh token để lấy access token mới")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Làm mới token thành công"),
            @ApiResponse(responseCode = "400", description = "Refresh token không được cung cấp"),
            @ApiResponse(responseCode = "401", description = "Refresh token không hợp lệ hoặc đã hết hạn")
    })
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

    @Operation(summary = "Quên mật khẩu", description = "Gửi email chứa link đặt lại mật khẩu đến địa chỉ email đã đăng ký")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đã gửi email hướng dẫn đặt lại mật khẩu (nếu email tồn tại)"),
            @ApiResponse(responseCode = "500", description = "Lỗi server khi xử lý yêu cầu"),
            @ApiResponse(responseCode = "503", description = "Lỗi gửi email")
    })
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

    @Operation(summary = "Đặt lại mật khẩu", description = "Đặt lại mật khẩu mới bằng token nhận được từ email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đặt lại mật khẩu thành công"),
            @ApiResponse(responseCode = "400", description = "Token không hợp lệ, đã hết hạn hoặc mật khẩu xác nhận không khớp"),
            @ApiResponse(responseCode = "500", description = "Lỗi server khi đặt lại mật khẩu")
    })
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