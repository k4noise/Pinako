package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogoutDto {

    @NotNull
    private String fingerprint;
}