package com.flightbooking.backend.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flightbooking.backend.DTO.RegisterRequestDTO;
import com.flightbooking.backend.Exception.UserAlreadyExistsException;
import com.flightbooking.backend.Model.Role;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequestDTO registerRequestDTO) {

        if (userRepository.existsByUsername(registerRequestDTO.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = User.builder()
                .username(registerRequestDTO.getUsername())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);
    }
}
