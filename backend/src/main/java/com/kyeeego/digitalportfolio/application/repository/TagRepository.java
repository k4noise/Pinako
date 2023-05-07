package com.kyeeego.digitalportfolio.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.kyeeego.digitalportfolio.domain.models.helpers.Tag;

@Transactional
public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByTag(String tag);

    List<Tag> findAllByTagIn(List<String> tags);

    List<Tag> findByArtworkId(long artworkId);
}
