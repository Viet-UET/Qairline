package com.flightbooking.backend.Service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.flightbooking.backend.Model.Role;
import com.flightbooking.backend.Model.User;
import com.flightbooking.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        try {
            return processOAuth2User(oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String googleId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();

            // Kiểm tra provider conflict
            if (user.getProvider() != null && !"GOOGLE".equalsIgnoreCase(user.getProvider())) {
                throw new OAuth2AuthenticationException(
                        "Email already registered with " + user.getProvider() + ". Please login with your password.");
            }

        } else {
            user = createNewUser(googleId, email, name);
        }

        return oAuth2User;

    }

    private User createNewUser(String googleId, String email, String name) {
        User user = User.builder()
                .username(generateUsername(email))
                .email(email)
                .fullName(name)
                .provider("GOOGLE")
                .googleId(googleId)
                .role(Role.USER)
                .password(null)
                .build();

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    private String generateUsername(String email) {
        String baseUsername = email.split("@")[0];
        return baseUsername;
    }
}
