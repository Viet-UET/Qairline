package com.flightbooking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BookingDTO {

    // ======================== Request DTOs ========================

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingRequestDTO {
        private String contactPhone;
        private Long flightInstanceId;
        private Long seatClassId;
        private Integer quantity;
        private List<String> seatNumbers;
    }

    // ======================== Response DTOs ========================

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingResponseDTO {
        private Long id;
        private String bookingCode;
        private String customerName;
        private String contactPhone;
        private BigDecimal totalAmount;
        private String status;
        private List<BookingDetailResponseDTO> bookingDetails;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingDetailResponseDTO {
        private Long id;
        private Long flightInstanceId;
        private String flightNumber;
        private String departureAirport;
        private String arrivalAirport;
        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private String seatClassName;
        private Integer quantity;
        private BigDecimal price;
        private List<TicketResponseDTO> tickets;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TicketResponseDTO {
        private Long id;
        private String seatNumber;
    }
}
