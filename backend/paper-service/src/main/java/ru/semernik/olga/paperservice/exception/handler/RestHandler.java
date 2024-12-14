package ru.semernik.olga.paperservice.exception.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.semernik.olga.paperservice.exception.BasePaperException;
import ru.semernik.olga.paperservice.exception.dto.ErrorResponse;

@RestControllerAdvice
@Slf4j
public class RestHandler {

  // ================== CUSTOM (BUSINESS) EXCEPTIONS ==================

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleCommonCreditGatewayException(BasePaperException e) {
    log.error(e.getMessage(), e);
    return buildErrorResponseEntity(e.getStatus(), e.getMessage());
  }

  private ResponseEntity<ErrorResponse> buildErrorResponseEntity(
      HttpStatus status, String message) {
    return ResponseEntity.status(status).body(new ErrorResponse(message, status));
  }
}
