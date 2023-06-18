package com.kyeeego.digitalportfolio.application.service;

import java.security.Principal;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
import com.kyeeego.digitalportfolio.domain.dto.LoginResponse;
import com.kyeeego.digitalportfolio.domain.dto.PasswordUpdateDto;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;
import com.kyeeego.digitalportfolio.domain.dto.UserUpdateDto;
import com.kyeeego.digitalportfolio.domain.models.User;
import com.kyeeego.digitalportfolio.exceptions.AlreadyExistsException;
import com.kyeeego.digitalportfolio.exceptions.InternalServerErrorException;
import com.kyeeego.digitalportfolio.exceptions.NotFoundException;
import com.kyeeego.digitalportfolio.exceptions.UnauthorizedException;
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
    private final NullAwareBeanUtilsBean beanUtilsBean;

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
        var user = userRepository
                .findByLogin(principal.getName())
                .orElseThrow(NotFoundException::new);

        if (!passwordEncoder.matches(body.getCurrentPassword(), user.getPassword()))
            throw new UnauthorizedException("Couldn't update user profile: Wrong password");

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
    public LoginResponse auth(AuthDto body) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(body.getLogin(), body.getPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Wrong username or password: " + e.getMessage());
        }

        var userDetails = userDetailsService
                .loadUserByUsername(body.getLogin());

        var tokenPair = sessionService.create(userDetails, body.getFingerprint());
        var user = userRepository.findByLogin(body.getLogin()).orElseThrow(NotFoundException::new);

        return new LoginResponse(
                user.getId(),
                user.getPfpUrl(),
                tokenPair);
    }

    @Override
    public TokenPair refreshTokens(String fingerprint, String refreshToken) {
        return sessionService.renew(fingerprint, refreshToken);
    }

    @Override
    public void logout(String fingerprint) {
        sessionService.logout(fingerprint);
    }

    @Override
    public Set<User> findByNameContains(String namePart) {
        return Stream.concat(
                userRepository.findByDisplayNameContains(namePart).stream(),
                userRepository.findByLoginContains(namePart).stream()).collect(Collectors.toSet());
    }

    @Override
    public void updatePassword(Principal principal, PasswordUpdateDto body) {
        var user = userRepository
                .findByLogin(principal.getName())
                .orElseThrow(NotFoundException::new);

        if (!passwordEncoder.matches(body.getCurrentPassword(), user.getPassword()))
            throw new UnauthorizedException("Couldn't update password: Wrong password");

        user.setPassword(passwordEncoder.encode(body.getNewPassword()));
        userRepository.save(user);
    }
}
