package com.flightbooking.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("refresh_token")
public class RefreshTokenInfo {

    @Id
    private String jwtId;

    private String username;

    @TimeToLive
    private Long ttl;
}