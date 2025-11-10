package com.flightbooking.backend.DTO;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String username;
    private String password;
}
