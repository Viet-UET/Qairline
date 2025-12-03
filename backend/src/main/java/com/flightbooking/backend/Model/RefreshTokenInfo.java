package com.flightbooking.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("refresh_token")
public class RefreshTokenInfo {

    @Id
    private String jwtId;

    @Indexed
    private String username;

    @TimeToLive
    private Long ttl;
}