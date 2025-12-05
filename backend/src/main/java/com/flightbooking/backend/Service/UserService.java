package com.flightbooking.backend.Service;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.flightbooking.backend.DTO.ChangePasswordRequestDTO;
import com.flightbooking.backend.DTO.UpdateUserRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;
import com.flightbooking.backend.Model.RefreshTokenInfo;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.RefreshTokenInfoRepository;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

        private final PasswordEncoder passwordEncoder;
        private final RefreshTokenInfoRepository refreshTokenInfoRepository;
        private final UserRepository userRepository;

        public UserInfoDTO getUserInfo(String username) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return UserInfoDTO.builder()
                                .id(user.getId())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .fullName(user.getFullName())
                                .phoneNumber(user.getPhoneNumber())
                                .role(user.getRole())
                                .build();
        }

        public UserInfoDTO updateUserInfo(String username, UpdateUserRequestDTO updateRequest) {
                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                user.setFullName(updateRequest.getFullName());
                user.setPhoneNumber(updateRequest.getPhoneNumber());
                user.setEmail(updateRequest.getEmail());

                User updatedUser = userRepository.save(user);

                return UserInfoDTO.builder()
                                .id(updatedUser.getId())
                                .username(updatedUser.getUsername())
                                .email(updatedUser.getEmail())
                                .fullName(updatedUser.getFullName())
                                .phoneNumber(updatedUser.getPhoneNumber())
                                .role(updatedUser.getRole())
                                .build();
        }

        public void changePassword(String username, ChangePasswordRequestDTO request) {
                if (!request.getNewPassword().equals(request.getConfirmPassword())) {
                        throw new IllegalArgumentException("Mật khẩu mới và xác nhận không khớp");
                }

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                if ("GOOGLE".equalsIgnoreCase(user.getProvider())) {
                        throw new RuntimeException("Cannot change password for Google accounts.");
                }

                if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                        throw new IllegalArgumentException("Mật khẩu hiện tại không đúng");
                }

                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                userRepository.save(user);

                List<RefreshTokenInfo> refreshTokens = refreshTokenInfoRepository.findByUsername(username);
                for (RefreshTokenInfo token : refreshTokens) {
                        refreshTokenInfoRepository.deleteById(token.getJwtId());
                }
        }

}
