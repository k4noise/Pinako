package com.kyeeego.digitalportfolio.domain.models;

import java.util.Date;

import com.kyeeego.digitalportfolio.domain.dto.ArtworkUploadDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Artwork {

    @Id
    @GeneratedValue
    private long id;

    private long userId;

    private String title;
    private String description;
    private String imageUrl;

    private long createdAt;
    private long updatedAt;

    public Artwork(ArtworkUploadDto dto, long userId) {
        title = dto.getTitle();
        description = dto.getDescription();
        imageUrl = dto.getImageUrl();
        this.userId = userId;

        var now = new Date().getTime();
        createdAt = now;
        updatedAt = now;
    }
}
