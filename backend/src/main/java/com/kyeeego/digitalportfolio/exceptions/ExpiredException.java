package com.kyeeego.digitalportfolio.exceptions;

import org.springframework.http.HttpStatus;

public class ExpiredException extends ApiException {
    public ExpiredException() {
        super(HttpStatus.GONE, "Expired");
    }

    public ExpiredException(String message) {
        super(HttpStatus.GONE, message);
    }
}