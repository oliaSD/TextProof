package ru.semernik.olga.userservice.exception;


import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class NotFoundUserException extends BaseUserException {

  public NotFoundUserException(HttpStatus status, String message) {
    super(status, message);
  }
}
