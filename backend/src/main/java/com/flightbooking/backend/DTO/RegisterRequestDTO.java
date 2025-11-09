package com.flightbooking.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDTO {

    @NotBlank
    private String username;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

}
