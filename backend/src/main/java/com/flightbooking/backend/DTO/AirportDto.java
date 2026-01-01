package com.flightbooking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.flightbooking.backend.Model.Airport}
 */
@Value
@AllArgsConstructor
@Data
public class AirportDto implements Serializable {
    String code;
    String name;
    String city;
}