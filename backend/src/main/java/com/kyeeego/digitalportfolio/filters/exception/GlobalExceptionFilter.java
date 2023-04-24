package com.kyeeego.digitalportfolio.filters.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kyeeego.digitalportfolio.exceptions.AlreadyExistsException;
import com.kyeeego.digitalportfolio.exceptions.ApiException;
import com.kyeeego.digitalportfolio.exceptions.BadRequestException;
import com.kyeeego.digitalportfolio.exceptions.ForbiddenException;
import com.kyeeego.digitalportfolio.exceptions.NotFoundException;
import com.kyeeego.digitalportfolio.exceptions.UnauthorizedException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionFilter {

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleRuntimeException(RuntimeException ex) {
        return runtimeExceptionHandler(ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(NotFoundException ex) {
        return defaultExceptionHandler(ex);
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequest(BadRequestException ex) {
        return defaultExceptionHandler(ex);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleUserAlreadyExists(AlreadyExistsException ex) {
        return defaultExceptionHandler(ex);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleBadCredentials(BadCredentialsException ex) {
        return runtimeExceptionHandler(ex, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleForbidden(ForbiddenException ex) {
        return defaultExceptionHandler(ex);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleUnauthorized(UnauthorizedException ex) {
        return defaultExceptionHandler(ex);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidatedEx(ConstraintViolationException ex) {
        return runtimeExceptionHandler(ex, HttpStatus.BAD_REQUEST);
    }

    private <E extends ApiException> ErrorResponse defaultExceptionHandler(E ex) {
        return new ErrorResponse(ex.getStatus().value(), ex.getMessage());
    }

    private <E extends RuntimeException> ErrorResponse runtimeExceptionHandler(E ex, HttpStatus status) {
        return new ErrorResponse(status.value(), ex.getMessage());
    }

}