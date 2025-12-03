package com.flightbooking.backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.from}")
    private String fromEmail;
    @Value("${app.name}")
    private String appName;
    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Đặt lại mật khẩu - " + appName);

            String resetLink = frontendUrl + "/reset-password?token=" + token;
            String emailContent = buildPasswordResetEmailText(resetLink);

            message.setText(emailContent);
            mailSender.send(message);

            log.info("Password reset email sent successfully to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", toEmail, e);
            throw new RuntimeException("Không thể gửi email. Vui lòng thử lại sau.");
        }
    }

    private String buildPasswordResetEmailText(String resetLink) {
        return "Xin chào,\n\n" +
                "Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại " + appName + ".\n\n" +
                "Vui lòng truy cập link sau để đặt lại mật khẩu:\n" +
                resetLink + "\n\n" +
                "Lưu ý: Link này chỉ có hiệu lực trong 10 phút và chỉ được sử dụng 1 lần.\n\n" +
                "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn.\n\n"
                +
                "Trân trọng,\n" +
                appName;
    }
}
