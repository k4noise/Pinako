package com.kyeeego.digitalportfolio.domain.dto;

import com.kyeeego.digitalportfolio.domain.models.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseNoArtworks {
    private long id;
    private String login;
    private String displayName;
    private String about;
    private String pfpUrl;

    public UserResponseNoArtworks(User u) {
        id = u.getId();
        login = u.getLogin();
        displayName = u.getDisplayName();
        about = u.getAbout();
        pfpUrl = u.getPfpUrl();
    }
}
