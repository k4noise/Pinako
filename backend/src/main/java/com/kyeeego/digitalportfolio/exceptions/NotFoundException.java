package com.kyeeego.digitalportfolio.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ApiException {
    public NotFoundException() {
        super(HttpStatus.NOT_FOUND, "Not found");
    }

    public NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}