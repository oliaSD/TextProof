package ru.semernik.olga.paperservice.exception;

import org.springframework.http.HttpStatus;

public class AuthException extends BasePaperException {

  public AuthException(HttpStatus status, String message) {
    super(status, message);
  }
}
