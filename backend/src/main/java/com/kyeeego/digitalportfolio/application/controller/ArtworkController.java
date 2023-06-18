package com.kyeeego.digitalportfolio.application.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kyeeego.digitalportfolio.application.port.ArtworkService;
import com.kyeeego.digitalportfolio.domain.dto.ArtworkUploadDto;
import com.kyeeego.digitalportfolio.domain.models.Artwork;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/artworks")
@RequiredArgsConstructor
public class ArtworkController {

    private final ArtworkService artworkService;

    @GetMapping("/all")
    public List<Artwork> getPage(@RequestParam int page, @RequestParam int n) {
        return artworkService.getPage(page, n);
    }

    @PostMapping("/upload")
    public void upload(@RequestBody @Valid ArtworkUploadDto body, Principal principal) {
        artworkService.upload(body, principal);
    }

    @GetMapping("{id}")
    public Artwork getById(@PathVariable long id) {
        return artworkService.findById(id);
    }

    @GetMapping
    public List<Artwork> findByQuery(@RequestParam String q) {
        var tokens = List.of(q.split(" "));

        var tags = tokens.stream()
                .filter(t -> t.startsWith("#"))
                .map(t -> t.substring(1))
                .toList();

        var titleParts = String.join(" ",
                tokens.stream()
                        .filter(t -> !t.startsWith("#"))
                        .toList());

        var searchResByTags = artworkService.findByTags(tags);
        var searchResByTitle = Collections.<Artwork>emptyList();
        if (titleParts != "")
            searchResByTitle = artworkService.findByTitleContains(titleParts);

        return Stream.concat(searchResByTags.stream(), searchResByTitle.stream()).toList();
    }
}
