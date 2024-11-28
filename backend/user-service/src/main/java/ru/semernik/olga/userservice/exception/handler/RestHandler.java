package ru.semernik.olga.userservice.exception.handler;

import java.util.logging.Logger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.semernik.olga.userservice.exception.BaseUserException;
import ru.semernik.olga.userservice.exception.dto.ErrorResponse;

@RestControllerAdvice
@Slf4j
public class RestHandler {

  // ================== CUSTOM (BUSINESS) EXCEPTIONS ==================

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleCommonCreditGatewayException(BaseUserException e) {
    log.error(e.getMessage(), e);
    return buildErrorResponseEntity(e.getStatus(), e.getMessage());
  }

  private ResponseEntity<ErrorResponse> buildErrorResponseEntity(
      HttpStatus status, String message) {
    return ResponseEntity.status(status).body(new ErrorResponse(message, status));
  }
}
