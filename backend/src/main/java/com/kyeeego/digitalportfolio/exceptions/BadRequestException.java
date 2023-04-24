package com.kyeeego.digitalportfolio.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends ApiException {
    public BadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }

    public BadRequestException() {
        super(HttpStatus.BAD_REQUEST, "Bad request");
    }
}