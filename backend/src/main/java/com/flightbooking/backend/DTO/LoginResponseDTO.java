package com.flightbooking.backend.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
public class LoginResponseDTO {
    private String token;
    private String refreshToken;
}
