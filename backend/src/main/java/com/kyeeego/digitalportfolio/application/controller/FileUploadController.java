package com.kyeeego.digitalportfolio.application.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kyeeego.digitalportfolio.application.port.FileStorageService;
import com.kyeeego.digitalportfolio.domain.dto.FileUploadResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public FileUploadResponse upload(@RequestParam("file") MultipartFile file, Principal principal) {
        var filename = fileStorageService.save(file, principal);
        return new FileUploadResponse(filename);
    }
}
