package com.flightbooking.backend.Model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "password_reset_token", timeToLive = 600) // 10 phút
public class PasswordResetToken {
    @Id
    private String token;

    @Indexed
    private String email;

    private LocalDateTime createdAt;
    private Integer attemptCount;
    private boolean used;
}
