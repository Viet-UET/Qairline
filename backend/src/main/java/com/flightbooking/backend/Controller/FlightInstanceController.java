package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.FlightInstanceDetailResponse;
import com.flightbooking.backend.DTO.FlightSearchRequest;
import com.flightbooking.backend.DTO.FlightSearchResponse;
import com.flightbooking.backend.Service.FlightInstanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
@Tag(name = "Flight Instance", description = "API tìm kiếm và xem chi tiết chuyến bay")
public class FlightInstanceController {
    private final FlightInstanceService flightInstanceService;

    @Operation(summary = "Tìm kiếm chuyến bay", description = "Tìm kiếm chuyến bay theo thành phố đi, thành phố đến, ngày khởi hành, hãng bay với hỗ trợ phân trang")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tìm kiếm thành công"),
            @ApiResponse(responseCode = "400", description = "Tham số tìm kiếm không hợp lệ")
    })
    @GetMapping("/search")
    public ResponseEntity<Page<FlightSearchResponse>> searchFlights(
            @Parameter(description = "Thành phố đi", example = "Hà Nội") @RequestParam(required = false) String cityOrigin,
            @Parameter(description = "Thành phố đến", example = "Hồ Chí Minh") @RequestParam(required = false) String cityDestination,
            @Parameter(description = "Ngày khởi hành (YYYY-MM-DD)", example = "2026-01-15") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
            @Parameter(description = "Tên hãng bay", example = "Vietnam Airlines") @RequestParam(required = false) String airlineName,
            @Parameter(description = "Số trang (bắt đầu từ 0)", example = "0") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Số kết quả mỗi trang", example = "10") @RequestParam(defaultValue = "10") int size) {
        FlightSearchRequest request = FlightSearchRequest.builder()
                .cityOrigin(cityOrigin)
                .cityDestination(cityDestination)
                .departureDate(departureDate)
                .airlineName(airlineName)
                .build();
        return ResponseEntity.ok(flightInstanceService.searchFilter(request, page, size));
    }

    @Operation(summary = "Xem chi tiết chuyến bay", description = "Lấy thông tin chi tiết của một chuyến bay theo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy thông tin thành công"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy chuyến bay")
    })
    @GetMapping("/{id}")
    public ResponseEntity<FlightInstanceDetailResponse> getFlightInstanceDetail(
            @Parameter(description = "ID của chuyến bay", required = true, example = "1") @PathVariable Long id) {
        return ResponseEntity.ok(flightInstanceService.getFlightInstanceDetail(id));
    }
}
