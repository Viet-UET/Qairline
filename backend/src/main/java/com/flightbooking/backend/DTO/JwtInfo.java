package com.flightbooking.backend.DTO;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtInfo implements Serializable {
    private String jwtId;
    private Date issueTime;
    private Date expiredTime;
}
