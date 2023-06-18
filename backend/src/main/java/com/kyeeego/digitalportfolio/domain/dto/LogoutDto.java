package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LogoutDto {

    @NotBlank
    private String fingerprint;
}