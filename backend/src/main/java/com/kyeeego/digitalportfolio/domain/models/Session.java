package com.kyeeego.digitalportfolio.domain.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    @Id
    @GeneratedValue
    private long id;

    private String refreshToken;
    private String userLogin;
    private Long expiresAt;
    private String fingerprint;

    public Session(String userLogin, Long expiresAt, String fingerprint) {
        this.userLogin = userLogin;
        this.expiresAt = expiresAt;
        this.fingerprint = fingerprint;
    }
}
