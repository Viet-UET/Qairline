package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.AircraftDTO.*;
import com.flightbooking.backend.Service.AircraftService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aircrafts")
@RequiredArgsConstructor
@Tag(name = "Aircraft", description = "API quản lý máy bay và cấu hình ghế ngồi")
public class AircraftController {

        private final AircraftService aircraftService;

        @Operation(summary = "Lấy danh sách máy bay", description = "Lấy danh sách máy bay với hỗ trợ phân trang và lọc theo hãng bay")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
        })
        @GetMapping
        public ResponseEntity<Page<AircraftListItemDTO>> getAllAircrafts(
                        @Parameter(description = "ID của hãng bay để lọc (tùy chọn)") @RequestParam(required = false) Long airlineId,

                        @Parameter(description = "Số trang (bắt đầu từ 0)") @RequestParam(defaultValue = "0") int page,

                        @Parameter(description = "Số lượng bản ghi mỗi trang") @RequestParam(defaultValue = "10") int size,

                        @Parameter(description = "Trường để sắp xếp") @RequestParam(defaultValue = "id") String sort) {
                Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
                Page<AircraftListItemDTO> aircrafts = aircraftService.getAllAircrafts(airlineId, pageable);
                return ResponseEntity.ok(aircrafts);
        }

        @Operation(summary = "Lấy chi tiết máy bay", description = "Lấy thông tin chi tiết máy bay bao gồm cấu hình ghế ngồi theo ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lấy thông tin thành công"),
                        @ApiResponse(responseCode = "404", description = "Không tìm thấy máy bay")
        })
        @GetMapping("/{id}")
        public ResponseEntity<AircraftResponseDTO> getAircraftById(
                        @Parameter(description = "ID của máy bay", required = true) @PathVariable Long id) {
                AircraftResponseDTO aircraft = aircraftService.getAircraftById(id);
                return ResponseEntity.ok(aircraft);
        }

        @Operation(summary = "Tạo máy bay mới", description = "Tạo mới máy bay kèm cấu hình ghế ngồi - Chỉ dành cho Admin")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Tạo máy bay thành công"),
                        @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
                        @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
                        @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
                        @ApiResponse(responseCode = "404", description = "Không tìm thấy airline_id hoặc seat_class_id")
        })
        @PostMapping
        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "bearerAuth")
        public ResponseEntity<AircraftResponseDTO> createAircraft(
                        @Valid @RequestBody CreateAircraftRequestDTO request) {
                AircraftResponseDTO aircraft = aircraftService.createAircraft(request);
                return ResponseEntity.status(HttpStatus.CREATED).body(aircraft);
        }

        @Operation(summary = "Cập nhật máy bay", description = "Cập nhật thông tin máy bay và điều chỉnh cấu hình ghế - Chỉ dành cho Admin")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Cập nhật thành công"),
                        @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
                        @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
                        @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
                        @ApiResponse(responseCode = "404", description = "Không tìm thấy máy bay, airline_id hoặc seat_class_id")
        })
        @PutMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "bearerAuth")
        public ResponseEntity<AircraftResponseDTO> updateAircraft(
                        @Parameter(description = "ID của máy bay cần cập nhật", required = true) @PathVariable Long id,

                        @Valid @RequestBody UpdateAircraftRequestDTO request) {
                AircraftResponseDTO aircraft = aircraftService.updateAircraft(id, request);
                return ResponseEntity.ok(aircraft);
        }

        @Operation(summary = "Xóa máy bay", description = "Xóa máy bay (chỉ được phép nếu chưa gán cho chuyến bay nào) - Chỉ dành cho Admin")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Xóa thành công"),
                        @ApiResponse(responseCode = "400", description = "Máy bay đã được gán cho chuyến bay, không thể xóa"),
                        @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
                        @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
                        @ApiResponse(responseCode = "404", description = "Không tìm thấy máy bay")
        })
        @DeleteMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        @SecurityRequirement(name = "bearerAuth")
        public ResponseEntity<String> deleteAircraft(
                        @Parameter(description = "ID của máy bay cần xóa", required = true) @PathVariable Long id) {
                aircraftService.deleteAircraft(id);
                return ResponseEntity.ok("Aircraft deleted successfully");
        }
}
