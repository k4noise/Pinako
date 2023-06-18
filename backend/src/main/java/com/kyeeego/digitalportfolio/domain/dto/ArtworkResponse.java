package com.kyeeego.digitalportfolio.domain.dto;

import java.util.List;

import com.kyeeego.digitalportfolio.domain.models.Artwork;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkResponse extends Artwork {
    private List<String> tags;
}
