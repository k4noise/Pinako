package com.kyeeego.digitalportfolio.application.controller;

import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kyeeego.digitalportfolio.application.port.AccountService;
import com.kyeeego.digitalportfolio.application.port.ArtworkService;
import com.kyeeego.digitalportfolio.domain.dto.AuthDto;
import com.kyeeego.digitalportfolio.domain.dto.LoginResponse;
import com.kyeeego.digitalportfolio.domain.dto.LogoutDto;
import com.kyeeego.digitalportfolio.domain.dto.PasswordUpdateDto;
import com.kyeeego.digitalportfolio.domain.dto.RefreshTokensDto;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;
import com.kyeeego.digitalportfolio.domain.dto.UserResponse;
import com.kyeeego.digitalportfolio.domain.dto.UserResponseNoArtworks;
import com.kyeeego.digitalportfolio.domain.dto.UserUpdateDto;
import com.kyeeego.digitalportfolio.exceptions.InternalServerErrorException;
import com.kyeeego.digitalportfolio.utils.NullAwareBeanUtilsBean;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountContoller {

    private final AccountService accountService;
    private final ArtworkService artworkService;
    private final NullAwareBeanUtilsBean beanUtilsBean;

    @PostMapping("/create")
    public void createUser(@RequestBody @Valid UserCreateDto body) {
        accountService.create(body);
    }

    @PostMapping("/update")
    public void update(@RequestBody @Valid UserUpdateDto userUpdateDto, Principal principal) {
        accountService.update(principal, userUpdateDto);
    }

    @PostMapping("/update/password")
    public void updatePassword(@RequestBody @Valid PasswordUpdateDto body, Principal principal) {
        accountService.updatePassword(principal, body);
    }

    @GetMapping
    public Set<UserResponseNoArtworks> findByNameContains(@RequestParam String q) {
        return accountService.findByNameContains(q)
                .stream()
                .map(u -> new UserResponseNoArtworks(u))
                .collect(Collectors.toSet());
    }

    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable long id) {
        var user = accountService.findById(id);
        var artworks = artworkService.findByAuthor(id);

        var res = new UserResponse();
        try {
            beanUtilsBean.copyProperties(res, user);
        } catch (Exception e) {
            throw new InternalServerErrorException(e.getMessage());
        }

        res.setArtworks(artworks);

        return res;
    }

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Valid AuthDto body) {
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
