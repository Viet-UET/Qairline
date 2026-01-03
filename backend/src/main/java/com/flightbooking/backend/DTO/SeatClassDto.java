package com.flightbooking.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.flightbooking.backend.Model.SeatClass}
 */
@Value
@AllArgsConstructor
@Data
public class SeatClassDto implements Serializable {
    Long id;
    String name;
}