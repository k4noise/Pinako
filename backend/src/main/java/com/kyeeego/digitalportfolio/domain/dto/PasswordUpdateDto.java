package com.kyeeego.digitalportfolio.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateDto {

    @NotBlank
    private String currentPassword;

    @NotBlank
    private String newPassword;
}
