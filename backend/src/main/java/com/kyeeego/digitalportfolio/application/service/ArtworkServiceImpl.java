package com.kyeeego.digitalportfolio.application.service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kyeeego.digitalportfolio.application.port.ArtworkService;
import com.kyeeego.digitalportfolio.application.repository.ArtworkRepository;
import com.kyeeego.digitalportfolio.application.repository.TagRepository;
import com.kyeeego.digitalportfolio.application.repository.UserRepository;
import com.kyeeego.digitalportfolio.domain.dto.ArtworkUpdateDto;
import com.kyeeego.digitalportfolio.domain.dto.ArtworkUploadDto;
import com.kyeeego.digitalportfolio.domain.models.Artwork;
import com.kyeeego.digitalportfolio.domain.models.helpers.Tag;
import com.kyeeego.digitalportfolio.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Override
    public void upload(ArtworkUploadDto body, Principal principal) {
        var userId = userRepository.findByLogin(principal.getName()).get().getId();
        var artwork = new Artwork(body, userId);
        artworkRepository.save(artwork);

        tagRepository.saveAll(
                body.getTags()
                        .stream()
                        .map(t -> new Tag(t, artwork.getId()))
                        .collect(Collectors.toList()));
    }

    @Override
    public void update(ArtworkUpdateDto body, Principal principal) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public List<Artwork> findByTags(List<String> tags) {
        var allArtworksWithSuchTags = tagRepository.findAllByTagIn(tags);

        var artworkOccurences = new HashMap<Long, Integer>();
        for (var a : allArtworksWithSuchTags)
            if (!artworkOccurences.containsKey(a.getArtworkId()))
                artworkOccurences.put(a.getArtworkId(), 1);
            else
                artworkOccurences.put(a.getArtworkId(), artworkOccurences.get(a.getArtworkId()) + 1);

        var artworkIdList = artworkOccurences.keySet()
                .stream()
                .filter(id -> artworkOccurences.get(id) == tags.size())
                .collect(Collectors.toList());

        return artworkRepository.findAllById(artworkIdList);
    }

    @Override
    public List<Artwork> findByTitleContains(String titleParts) {
        return artworkRepository.findByTitleContainsIgnoreCase(titleParts);
    }

    @Override
    public void delete(long id) {
        artworkRepository.deleteById(id);
    }

    @Override
    public Artwork findById(long id) {
        return artworkRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<Artwork> findByAuthor(long authorId) {
        return artworkRepository.findByUserId(authorId);
    }

    @Override
    public List<Artwork> getPage(int page, int n) {
        return artworkRepository
                .findAll(PageRequest.of(page, n, Sort.by("createdAt").descending()))
                .toList();
    }

}
