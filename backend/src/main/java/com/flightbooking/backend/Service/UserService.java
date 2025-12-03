package com.flightbooking.backend.Service;

import org.springframework.stereotype.Service;

import com.flightbooking.backend.DTO.UpdateUserRequestDTO;
import com.flightbooking.backend.DTO.UserInfoDTO;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

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
}
