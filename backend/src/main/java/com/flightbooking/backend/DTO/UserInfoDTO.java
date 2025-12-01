package com.flightbooking.backend.DTO;

import com.flightbooking.backend.Model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    private Long id;
    private String username;
    private String fullName;
    private String phoneNumber;
    private Role role;
}
