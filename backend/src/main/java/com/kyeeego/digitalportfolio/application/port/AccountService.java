package com.kyeeego.digitalportfolio.application.port;

import java.security.Principal;

import com.kyeeego.digitalportfolio.domain.dto.AuthDto;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;
import com.kyeeego.digitalportfolio.domain.dto.UserUpdateDto;
import com.kyeeego.digitalportfolio.domain.models.User;

public interface AccountService {
    void create(UserCreateDto body);

    void update(Principal principal, UserUpdateDto body);

    User findById(long id);

    TokenPair auth(AuthDto body);

    TokenPair refreshTokens(String fingerprint, String refreshToken);

    void logout(String fingerprint);
}
