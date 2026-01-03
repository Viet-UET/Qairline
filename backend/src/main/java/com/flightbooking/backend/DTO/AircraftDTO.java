package com.flightbooking.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Consolidated DTOs for Aircraft operations
 */
public class AircraftDTO {

    /**
     * DTO for seat configuration in create/update requests
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AircraftSeatConfigDTO {
        @NotNull(message = "Seat class ID is required")
        @Positive(message = "Seat class ID must be positive")
        private Long seatClassId;

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be positive")
        private Integer quantity;
    }

    /**
     * DTO for creating new aircraft
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateAircraftRequestDTO {
        @NotNull(message = "Airline ID is required")
        @Positive(message = "Airline ID must be positive")
        private Long airlineId;

        @NotBlank(message = "Model is required")
        private String model;

        @NotBlank(message = "Registration code is required")
        private String registrationCode;

        @NotEmpty(message = "Seat configurations are required")
        private List<AircraftSeatConfigDTO> seatConfigs;
    }

    /**
     * DTO for updating aircraft
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateAircraftRequestDTO {
        @NotNull(message = "Airline ID is required")
        @Positive(message = "Airline ID must be positive")
        private Long airlineId;

        @NotBlank(message = "Model is required")
        private String model;

        @NotBlank(message = "Registration code is required")
        private String registrationCode;

        @NotEmpty(message = "Seat configurations are required")
        private List<AircraftSeatConfigDTO> seatConfigs;
    }

    /**
     * DTO for seat details in response
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AircraftSeatResponseDTO {
        private Long id;
        private Long seatClassId;
        private String seatClassName;
        private Integer quantity;
    }

    /**
     * DTO for detailed aircraft response with full seat configuration
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AircraftResponseDTO {
        private Long id;
        private Long airlineId;
        private String airlineName;
        private String airlineCode;
        private String model;
        private String registrationCode;
        private List<AircraftSeatResponseDTO> seats;
    }

    /**
     * DTO for aircraft list item (without detailed seat information)
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AircraftListItemDTO {
        private Long id;
        private Long airlineId;
        private String airlineName;
        private String airlineCode;
        private String model;
        private String registrationCode;
        private Integer totalSeats;
    }
}
