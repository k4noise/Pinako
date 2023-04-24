package com.kyeeego.digitalportfolio.application.port;

import org.springframework.security.core.userdetails.UserDetails;

import com.kyeeego.digitalportfolio.domain.dto.TokenPair;

public interface SessionService {
    TokenPair create(UserDetails userDetails, String fingerprint);

    TokenPair renew(String fingerprint, String refreshToken);

    void logout(String fingerprint);
}