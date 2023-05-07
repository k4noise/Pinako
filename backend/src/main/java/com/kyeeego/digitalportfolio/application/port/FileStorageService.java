package com.kyeeego.digitalportfolio.application.port;

import java.security.Principal;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String save(MultipartFile file, Principal principal);
}
