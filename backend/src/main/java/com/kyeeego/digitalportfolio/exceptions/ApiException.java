package com.kyeeego.digitalportfolio.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public abstract class ApiException extends RuntimeException {
    private HttpStatus status;
    private String message;

    public ApiException(String message) {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.message = message;
    }

    public ApiException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}