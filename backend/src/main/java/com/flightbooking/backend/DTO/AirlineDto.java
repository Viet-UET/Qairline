package com.flightbooking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.flightbooking.backend.Model.Airline}
 */
@Data
@Value
@AllArgsConstructor
public class AirlineDto implements Serializable {
    String code;
    String name;
}