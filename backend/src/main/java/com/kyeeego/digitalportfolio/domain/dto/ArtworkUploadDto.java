package com.kyeeego.digitalportfolio.domain.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtworkUploadDto {

    @NotNull
    @NotBlank
    @Size(max = 50)
    private String title;

    @NotNull
    @Size(max = 300)
    private String description;

    @NotNull
    @NotBlank
    private String imageUrl;

    @NotNull
    private List<String> tags;
}
