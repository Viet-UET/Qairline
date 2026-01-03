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
public class FlightSearchResponse {
    Long flightInstanceId;
    String flightNumber;
    String airlineName;
    String originAirportCode;
    String originCity;
    String destinationAirportCode;
    String destinationCity;
    LocalDateTime departureTime;
    List<SeatClassPriceDTO> seatClassPrices;
}
