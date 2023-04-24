package com.kyeeego.digitalportfolio.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.kyeeego.digitalportfolio.domain.models.User;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(long id);

    Optional<User> findByLogin(String login);

    boolean existsByLogin(String login);
}
