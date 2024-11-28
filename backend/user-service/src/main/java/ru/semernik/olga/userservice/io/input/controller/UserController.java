package ru.semernik.olga.userservice.io.input.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.userservice.service.CreateUserService;
import ru.semernik.olga.userservice.user.UsersApi;
import ru.semernik.olga.userservice.user.dto.CreateUserRequest;
import ru.semernik.olga.userservice.user.dto.CreateUserResponse;
import ru.semernik.olga.userservice.user.dto.FindUserResponse;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse;

@RestController
@RequiredArgsConstructor
public class UserController implements UsersApi {

  private final CreateUserService createUserService;

  @Override
  public ResponseEntity<CreateUserResponse> create(CreateUserRequest createUserRequest) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(createUserService.createUser(createUserRequest));
  }

  @Override
  public ResponseEntity<Void> delete(String username) {
    return null;
  }

  @Override
  public ResponseEntity<FindUserResponse> find(String username) {
    return null;
  }

  @Override
  public ResponseEntity<InfoUserResponse> info() {
    return null;
  }

  @Override
  public ResponseEntity<Void> update(CreateUserRequest createUserRequest) {
    return null;
  }
}
