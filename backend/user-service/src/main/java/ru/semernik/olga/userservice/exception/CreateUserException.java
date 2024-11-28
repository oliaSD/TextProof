package ru.semernik.olga.userservice.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CreateUserException extends BaseUserException {

  public CreateUserException(HttpStatus status, String message) {
    super(status, message);
  }
}
