package com.flightbooking.backend.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flightbooking.backend.Model.PasswordResetToken;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.PasswordResetTokenRepository;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public void initiatePasswordReset(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            log.warn("Password reset attempted for non-existent email: {}", email);
            return;
        }

        passwordResetTokenRepository.findByEmail(email).ifPresent(passwordResetTokenRepository::delete);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .email(email)
                .createdAt(LocalDateTime.now())
                .attemptCount(0)
                .used(false)
                .build();

        passwordResetTokenRepository.save(resetToken);

        try {
            emailService.sendPasswordResetEmail(email, token);
        } catch (Exception e) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Không thể gửi email. Vui lòng thử lại sau.");
        }
    }

    public void resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findById(token);
        if (tokenOpt.isEmpty()) {
            throw new IllegalArgumentException("Token không hợp lệ hoặc đã hết hạn");
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.isUsed()) {
            throw new IllegalArgumentException("Token đã được sử dụng");
        }


        resetToken.setAttemptCount(resetToken.getAttemptCount() + 1);
        passwordResetTokenRepository.save(resetToken);

        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

    }

}
