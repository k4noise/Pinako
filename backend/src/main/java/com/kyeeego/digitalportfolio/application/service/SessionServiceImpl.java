package com.kyeeego.digitalportfolio.application.service;

import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.kyeeego.digitalportfolio.application.port.AccessTokenService;
import com.kyeeego.digitalportfolio.application.port.SessionService;
import com.kyeeego.digitalportfolio.application.repository.SessionRepository;
import com.kyeeego.digitalportfolio.domain.dto.TokenPair;
import com.kyeeego.digitalportfolio.domain.models.Session;
import com.kyeeego.digitalportfolio.exceptions.ExpiredException;
import com.kyeeego.digitalportfolio.exceptions.UnauthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final AccessTokenService accessTokenService;
    private final UserDetailsService userDetailsService;

    @Override
    public TokenPair create(UserDetails userDetails, String fingerprint) {
        if (getAmountOfSessions(userDetails.getUsername()) >= 3)
            sessionRepository.deleteByUserLogin(userDetails.getUsername());

        var session = new Session(
                userDetails.getUsername(),
                System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30,
                fingerprint);
        var refreshToken = UUID.randomUUID().toString();
        session.setRefreshToken(refreshToken);

        sessionRepository.save(session);

        var accessToken = accessTokenService.generateToken(userDetails);

        return new TokenPair(accessToken, refreshToken);
    }

    @Override
    public TokenPair renew(String fingerprint, String refreshToken) {
        var session = sessionRepository
                .findByRefreshToken(refreshToken)
                .orElseThrow(UnauthorizedException::new);

        sessionRepository.delete(session);

        if (hasExpired(session))
            throw new ExpiredException("Refresh token expired! Have to relogin");

        if (!isValidFingerprint(session, fingerprint))
            throw new UnauthorizedException("Invalid fingerprint");

        var userDetails = userDetailsService
                .loadUserByUsername(session.getUserLogin());

        var newRefreshToken = UUID.randomUUID().toString();
        var newAccessToken = accessTokenService.generateToken(userDetails);

        var newSession = new Session(
                userDetails.getUsername(),
                System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30,
                fingerprint);
        newSession.setRefreshToken(newRefreshToken);

        sessionRepository.save(newSession);

        return new TokenPair(newAccessToken, newRefreshToken);
    }

    @Override
    public void logout(String fingerprint) {
        sessionRepository.deleteByFingerprint(fingerprint);
    }

    private int getAmountOfSessions(String userEmail) {
        return sessionRepository.findByUserLogin(userEmail).size();
    }

    private boolean hasExpired(Session s) {
        return s.getExpiresAt() <= System.currentTimeMillis();
    }

    private boolean isValidFingerprint(Session s, String fingerprint) {
        return s.getFingerprint().equals(fingerprint);
    }
}
