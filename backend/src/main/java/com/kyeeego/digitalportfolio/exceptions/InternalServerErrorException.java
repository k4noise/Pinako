package com.kyeeego.digitalportfolio.exceptions;

public class InternalServerErrorException extends ApiException {
    public InternalServerErrorException(String msg) {
        super(msg);
    }

    public InternalServerErrorException() {
        super("Unidentified internal server error");
    }
}
