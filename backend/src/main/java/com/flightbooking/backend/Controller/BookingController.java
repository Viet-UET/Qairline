package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.BookingDTO;
import com.flightbooking.backend.Service.BookingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Booking", description = "API quản lý đặt vé chuyến bay")
public class BookingController {

    private final BookingService bookingService;

    @Operation(summary = "Đặt vé chuyến bay", description = "Tạo một đơn đặt vé mới cho người dùng đã xác thực")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Đặt vé thành công"),
            @ApiResponse(responseCode = "400", description = "Thông tin đặt vé không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<BookingDTO.BookingResponseDTO> createBooking(
            @RequestBody BookingDTO.BookingRequestDTO request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        BookingDTO.BookingResponseDTO response = bookingService.createBooking(request, username);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Lấy danh sách đặt vé của tôi", description = "Lấy tất cả các đơn đặt vé của người dùng hiện tại")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<List<BookingDTO.BookingResponseDTO>> getMyBookings() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        List<BookingDTO.BookingResponseDTO> bookings = bookingService.getBookingsByUsername(username);

        return ResponseEntity.ok(bookings);
    }

    @Operation(summary = "Hủy đặt vé", description = "Hủy một đơn đặt vé theo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Hủy vé thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "403", description = "Không có quyền hủy đơn đặt vé này"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy đơn đặt vé")
    })
    @DeleteMapping("/{id}/cancel")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> cancelBooking(
            @Parameter(description = "ID của đơn đặt vé cần hủy", required = true) @PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        bookingService.cancelBooking(id, username);

        return ResponseEntity.ok("Booking cancelled successfully");
    }
}
