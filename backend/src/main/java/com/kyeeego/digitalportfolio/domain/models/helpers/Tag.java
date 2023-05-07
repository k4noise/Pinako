package com.kyeeego.digitalportfolio.domain.models.helpers;

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
public class Tag {

    @Id
    @GeneratedValue
    private long id;

    private long artworkId;;

    private String tag;

    public Tag(String tag, long artwork) {
        this.tag = tag;
        this.artworkId = artwork;
    }
}
