package ru.semernik.olga.paperservice.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CreateFileException extends BasePaperException {

  public CreateFileException(HttpStatus status, String message) {
    super(status, message);
  }
}
