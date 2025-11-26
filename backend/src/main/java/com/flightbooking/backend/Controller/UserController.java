package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.LoginResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightbooking.backend.DTO.LoginRequestDTO;
import com.flightbooking.backend.DTO.RegisterRequestDTO;
import com.flightbooking.backend.Service.LoginService;
import com.flightbooking.backend.Service.RegisterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.access.prepost.PreAuthorize;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {

    private final RegisterService registerService;
    private final LoginService loginService;

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
}
