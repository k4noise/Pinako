package com.kyeeego.digitalportfolio.domain.dto;

import java.util.List;

import com.kyeeego.digitalportfolio.domain.models.Artwork;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private long id;
    private String login;
    private String displayName;
    private String about;
    private String pfpUrl;

    private List<Artwork> artworks;

}
