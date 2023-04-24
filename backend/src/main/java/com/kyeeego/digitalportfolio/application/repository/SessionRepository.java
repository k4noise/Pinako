package com.kyeeego.digitalportfolio.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.kyeeego.digitalportfolio.domain.models.Session;

@Transactional
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByUserLogin(String userLogin);

    void deleteByUserLogin(String userLogin);

    void deleteByFingerprint(String fingerprint);

    Optional<Session> findByRefreshToken(String refreshToken);
}
