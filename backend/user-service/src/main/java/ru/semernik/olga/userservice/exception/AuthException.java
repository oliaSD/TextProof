package ru.semernik.olga.userservice.exception;

import org.springframework.http.HttpStatus;

public class AuthException extends BaseUserException {

  public AuthException(HttpStatus status, String message) {
    super(status, message);
  }
}
