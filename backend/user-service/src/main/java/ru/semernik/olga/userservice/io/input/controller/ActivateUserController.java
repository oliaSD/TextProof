package ru.semernik.olga.userservice.io.input.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.userservice.service.ActivateUserService;
import ru.semernik.olga.userservice.user.ActivateApi;
import ru.semernik.olga.userservice.user.dto.ActivateRequest;

@RestController
@RequiredArgsConstructor
public class ActivateUserController implements ActivateApi {

  private final ActivateUserService activateUserService;


  @Override
  public ResponseEntity<Void> activate(ActivateRequest activateRequest) {
    return null;
  }

  @Override
  public ResponseEntity<Void> getActivate(String activateCode) {
    activateUserService.getActivateUser(activateCode);
    return ResponseEntity.ok().build();
  }
}
