package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokensDto {

    @NotBlank
    private String token;

    @NotBlank
    private String fingerprint;
}