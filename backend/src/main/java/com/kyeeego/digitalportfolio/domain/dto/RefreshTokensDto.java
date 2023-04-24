package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RefreshTokensDto {

    @NotNull
    @NotBlank
    private String token;

    @NotNull
    @NotBlank
    private String fingerprint;
}