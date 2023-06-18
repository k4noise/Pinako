package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateDto {
    @Size(min = 5, max = 20)
    private String login;

    @Size(min = 1, max = 50)
    private String displayName;

    @Size(max = 300)
    private String about;

    private String pfpUrl;

    @NotBlank
    private String currentPassword;
}
