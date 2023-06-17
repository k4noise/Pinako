package com.kyeeego.digitalportfolio.domain.models;

import com.kyeeego.digitalportfolio.domain.dto.UserCreateDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private long id;

    private String login;
    private String displayName;
    private String about;

    private String password;

    private String pfpUrl = "defaultpfp.jpg";
    // private String bannerUrl;

    public User(UserCreateDto dto) {
        login = dto.getLogin();
        displayName = login;
        about = "";
    }
}
