package com.flightbooking.backend.Controller;

import com.flightbooking.backend.Model.Airline;
import com.flightbooking.backend.Model.Airport;
import com.flightbooking.backend.Model.SeatClass;
import com.flightbooking.backend.Service.FlightService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
@Tag(name = "Flight", description = "API lấy dữ liệu tham chiếu chuyến bay (hãng bay, sân bay, hạng ghế)")
public class FlightController {
    private final FlightService flightService;

    @Operation(summary = "Lấy danh sách hãng bay", description = "Lấy tất cả các hãng bay có trong hệ thống")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
    })
    @GetMapping("/airlines")
    public ResponseEntity<List<?>> getAllAirlines() {
        return ResponseEntity.ok().body(flightService.getAllAirline());
    }

    @Operation(summary = "Lấy danh sách sân bay", description = "Lấy tất cả các sân bay có trong hệ thống")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
    })
    @GetMapping("/airports")
    public ResponseEntity<List<?>> getAllAirports() {
        return ResponseEntity.ok().body(flightService.getAllAirport());
    }

    @Operation(summary = "Lấy danh sách hạng ghế", description = "Lấy tất cả các hạng ghế có sẵn (Economy, Business, First Class,...)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
    })
    @GetMapping("/seat-classes")
    public ResponseEntity<List<?>> getAllSeatClasses() {
        return ResponseEntity.ok().body(flightService.getAllSeatClass());
    }
}
