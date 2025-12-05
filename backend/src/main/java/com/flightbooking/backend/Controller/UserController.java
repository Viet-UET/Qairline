package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.ChangePasswordRequestDTO;
import com.flightbooking.backend.DTO.UpdateUserRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.flightbooking.backend.Service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserInfoDTO userInfo = userService.getUserInfo(userDetails.getUsername());
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/me")
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

    @PatchMapping("/me/password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid ChangePasswordRequestDTO changePasswordRequestDTO) {

        try {
            userService.changePassword(userDetails.getUsername(), changePasswordRequestDTO);
            return ResponseEntity.ok("đổi mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
