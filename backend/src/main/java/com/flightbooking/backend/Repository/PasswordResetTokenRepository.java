package com.flightbooking.backend.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.flightbooking.backend.Model.PasswordResetToken;

@Repository
public interface PasswordResetTokenRepository extends CrudRepository<PasswordResetToken, String> {
    Optional<PasswordResetToken> findByEmail(String email);
}
