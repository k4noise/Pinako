package com.kyeeego.digitalportfolio.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.kyeeego.digitalportfolio.domain.models.Artwork;

@Transactional
public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findByTitleContainsIgnoreCase(String titlePart);

    List<Artwork> findByUserId(long userId);
}
