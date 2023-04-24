package com.kyeeego.digitalportfolio.application.service;

import java.security.Principal;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kyeeego.digitalportfolio.application.port.AccountService;
import com.kyeeego.digitalportfolio.application.port.SessionService;
import com.kyeeego.digitalportfolio.application.repository.UserRepository;
import com.kyeeego.digitalportfolio.domain.dto.AuthDto;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;
import com.kyeeego.digitalportfolio.domain.dto.UserUpdateDto;
import com.kyeeego.digitalportfolio.domain.models.User;
import com.kyeeego.digitalportfolio.exceptions.AlreadyExistsException;
import com.kyeeego.digitalportfolio.exceptions.InternalServerErrorException;
import com.kyeeego.digitalportfolio.exceptions.NotFoundException;
import com.kyeeego.digitalportfolio.utils.NullAwareBeanUtilsBean;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class AccountServiceImpl implements AccountService {

    private final UserRepository userRepository;
    private final SessionService sessionService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;
    private final UserDetailsService userDetailsService;

    @Override
    public void create(UserCreateDto body) {
        if (userRepository.existsByLogin(body.getLogin()))
            throw new AlreadyExistsException();

        var user = new User(body);
        user.setPassword(passwordEncoder.encode(body.getPassword()));

        userRepository.save(user);

        log.info("new user id: " + user.getId());
    }

    @Override
    public void update(Principal principal, UserUpdateDto body) {
        if (body.getLogin() != null && userRepository.existsByLogin(body.getLogin()))
            throw new AlreadyExistsException();

        var user = userRepository
                .findByLogin(principal.getName())
                .orElseThrow(NotFoundException::new);

        var beanUtilsBean = new NullAwareBeanUtilsBean();
        try {
            beanUtilsBean.copyProperties(user, body);
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }

        userRepository.save(user);
    }

    @Override
    public User findById(long id) {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public TokenPair auth(AuthDto body) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(body.getLogin(), body.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Wrong username or password: " + e.getMessage());
        }

        var userDetails = userDetailsService
                .loadUserByUsername(body.getLogin());

        return sessionService.create(userDetails, body.getFingerprint());
    }

    @Override
    public TokenPair refreshTokens(String fingerprint, String refreshToken) {
        return sessionService.renew(fingerprint, refreshToken);
    }

    @Override
    public void logout(String fingerprint) {
        sessionService.logout(fingerprint);
    }
}
