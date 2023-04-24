package com.kyeeego.digitalportfolio.application.port;

import org.springframework.security.core.userdetails.UserDetails;

public interface AccessTokenService {
    String generateToken(UserDetails userDetails);

    boolean validateToken(String token, UserDetails userDetails);

    String extractLogin(String token);
}
