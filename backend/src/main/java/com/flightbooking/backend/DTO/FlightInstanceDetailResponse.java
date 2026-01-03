package com.flightbooking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightInstanceDetailResponse {
    private Long id;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    // Thông tin chuyến bay
    private String flightNumber;

    // Thông tin hãng hàng không
    private String airlineName;

    // Thông tin sân bay đi
    private String originAirportCode;
    private String originAirportName;
    private String originCity;

    // Thông tin sân bay đến
    private String destinationAirportCode;
    private String destinationAirportName;
    private String destinationCity;

    // Thông tin máy bay
    private String aircraftModel;
    private String aircraftRegistrationCode;

    // Thông tin ghế và giá
    private List<SeatAvailabilityDTO> seatAvailability;
}