package ru.semernik.olga.userservice.io.input.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.userservice.service.AuthService;
import ru.semernik.olga.userservice.user.AuthApi;
import ru.semernik.olga.userservice.user.dto.AuthRequest;
import ru.semernik.olga.userservice.user.dto.AuthResponse;

@RestController
@OpenAPIDefinition
@RequiredArgsConstructor
public class AuthController implements AuthApi {

  private final AuthService authService;

  @Override
  public ResponseEntity<AuthResponse> auth(AuthRequest authRequest) {
    return ResponseEntity.ok(authService.authenticate(authRequest));
  }
}
