package com.kyeeego.digitalportfolio.application.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.Date;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kyeeego.digitalportfolio.application.port.FileStorageService;
import com.kyeeego.digitalportfolio.exceptions.InternalServerErrorException;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path storageLocation;

    public FileStorageServiceImpl(Environment env) {
        var storagePath = env.getProperty("filestorage.path");

        storageLocation = Paths.get(storagePath)
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(storageLocation);
            Files.copy(this.getClass().getClassLoader().getResourceAsStream("defaultpfp.jpg"),
                    storageLocation.resolve("defaultpfp.jpg"));
        } catch (Exception ex) {
            throw new RuntimeException(
                    "Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public String save(MultipartFile file, Principal principal) {
        var name = principal.getName()
                + "-" + new Date().getTime()
                + "." + getFileExtension(file.getOriginalFilename());

        try {
            var targetLocation = storageLocation.resolve(name);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new InternalServerErrorException("Unable to upload file: " + e.getMessage());
        }

        return name;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return null;
        }

        var splitName = fileName.split("\\.");

        return splitName[splitName.length - 1];
    }

}
