package com.kyeeego.digitalportfolio.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends ApiException {
    public ForbiddenException() {
        super(HttpStatus.FORBIDDEN, "Forbidden");
    }

    public ForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}