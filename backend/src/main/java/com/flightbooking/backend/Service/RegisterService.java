package com.flightbooking.backend.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flightbooking.backend.DTO.RegisterRequestDTO;
import com.flightbooking.backend.Model.Role;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final UserRepository userRepository;

    public void register(RegisterRequestDTO registerRequestDTO) {

        if (userRepository.existsByUsername(registerRequestDTO.getUsername())) {
            throw new RuntimeException("User already registered");
        }

        PasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = User.builder()
                .fullName(null)
                .username(registerRequestDTO.getUsername())
                .password(encoder.encode(registerRequestDTO.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }
}
