package com.kyeeego.digitalportfolio.domain.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtworkUpdateDto {

    @NotNull
    private long id;

    @Size(max = 50)
    private String title;

    @Size(max = 300)
    private String description;

    private String imageUrl;

    private List<String> tags;
}
