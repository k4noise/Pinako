package com.kyeeego.digitalportfolio.application.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyeeego.digitalportfolio.application.port.AccountService;
import com.kyeeego.digitalportfolio.domain.dto.AuthDto;
import com.kyeeego.digitalportfolio.domain.dto.LogoutDto;
import com.kyeeego.digitalportfolio.domain.dto.RefreshTokensDto;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;
import com.kyeeego.digitalportfolio.domain.dto.UserUpdateDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountContoller {

    private final AccountService accountService;

    @PostMapping("/create")
    public void createUser(@RequestBody @Valid UserCreateDto body) {
        accountService.create(body);
    }

    @PostMapping("/update")
    public void update(@RequestBody @Valid UserUpdateDto userUpdateDto, Principal principal) {
        accountService.update(principal, userUpdateDto);
    }

    @PostMapping("/auth/login")
    public TokenPair login(@RequestBody @Valid AuthDto body) {
        return accountService.auth(body);
    }

    @PostMapping("/auth/refresh")
    public TokenPair refreshTokens(@RequestBody @Valid RefreshTokensDto body) {
        return accountService.refreshTokens(body.getFingerprint(), body.getToken());
    }

    @PostMapping("/auth/logout")
    public void logout(@RequestBody @Valid LogoutDto body) {
        accountService.logout(body.getFingerprint());
    }

    @GetMapping("/test")
    public String test(Principal principal) {
        return "Logged in as " + principal.getName();
    }
}
