package ru.semernik.olga.userservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@RequiredArgsConstructor
public class BaseUserException extends RuntimeException {

  protected final HttpStatus status;

  protected final String message;
}
