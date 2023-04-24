package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreateDto {

    @NotNull
    @Size(min = 5, max = 20)
    private String login;

    @NotNull
    private String password;
}
