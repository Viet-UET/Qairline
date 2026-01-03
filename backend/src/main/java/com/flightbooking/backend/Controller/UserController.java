package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.ChangePasswordRequestDTO;
import com.flightbooking.backend.DTO.UpdateUserRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User", description = "API quản lý thông tin người dùng")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Lấy thông tin người dùng hiện tại", description = "Lấy thông tin chi tiết của người dùng đang đăng nhập")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy thông tin thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy người dùng")
    })
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserInfoDTO userInfo = userService.getUserInfo(userDetails.getUsername());
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @Operation(summary = "Cập nhật thông tin người dùng", description = "Cập nhật thông tin cá nhân của người dùng hiện tại")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cập nhật thành công"),
            @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
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

    @Operation(summary = "Đổi mật khẩu", description = "Đổi mật khẩu của người dùng hiện tại")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đổi mật khẩu thành công"),
            @ApiResponse(responseCode = "400", description = "Mật khẩu cũ không đúng hoặc dữ liệu không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
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
