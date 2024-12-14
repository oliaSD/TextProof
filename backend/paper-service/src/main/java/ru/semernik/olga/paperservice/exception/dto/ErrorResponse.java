package ru.semernik.olga.paperservice.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ErrorResponse {

  private String message;

  private HttpStatus status;
}
