package ru.semernik.olga.userservice.io.input.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.userservice.service.CreateUserService;
import ru.semernik.olga.userservice.service.common.UserService;
import ru.semernik.olga.userservice.user.AdminApi;
import ru.semernik.olga.userservice.user.dto.CreateUserRequest;
import ru.semernik.olga.userservice.user.dto.CreateUserResponse;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse;
import ru.semernik.olga.userservice.user.dto.ToggleUserBlockRequest;

@RestController
@RequiredArgsConstructor
public class AdminController implements AdminApi {

  private final CreateUserService createUserService;
  private final UserService userService;

  @Override
  public ResponseEntity<CreateUserResponse> createAdmin(CreateUserRequest createUserRequest) {
    return ResponseEntity.ok(createUserService.createAdmin(createUserRequest));
  }

  @Override
  public ResponseEntity<List<InfoUserResponse>> getAllUsers() {
    return ResponseEntity.ok(userService.findAllUsers());
  }

  @Override
  public ResponseEntity<Void> toggleUserBlock(String username,
      ToggleUserBlockRequest toggleUserBlockRequest) {
    userService.toggleUserBlock(username, toggleUserBlockRequest);
    return ResponseEntity.ok().build();
  }
}
