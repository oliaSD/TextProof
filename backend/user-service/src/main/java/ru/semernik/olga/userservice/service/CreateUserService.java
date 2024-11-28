package ru.semernik.olga.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.configuration.security.JwtTokenProvider;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.entity.UserRole;
import ru.semernik.olga.userservice.exception.CreateUserException;
import ru.semernik.olga.userservice.service.common.UserService;
import ru.semernik.olga.userservice.user.dto.AuthResponse;
import ru.semernik.olga.userservice.user.dto.CreateUserRequest;
import ru.semernik.olga.userservice.user.dto.CreateUserResponse;

@Service
@RequiredArgsConstructor
public class CreateUserService {

  private final UserService userService;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public CreateUserResponse createUser(CreateUserRequest request) {
    var user = userService.findUserByUsername(request.getUsername());
    if (user.isPresent()) {
      throw new CreateUserException(HttpStatus.CONFLICT,
          "user with username " + request.getUsername() + " already exists");
    }
    if (userService.checkUserEmail(request.getEmail())) {
      throw new CreateUserException(HttpStatus.CONFLICT,
          "user with email " + request.getEmail() + " already exists");
    }
    UserEntity newUser = UserEntity.builder()
        .email(request.getEmail())
        .username(request.getUsername())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(UserRole.ROLE_USER)
        .accountStatus("ACTIVE")
        .build();
    userService.saveUser(newUser);
    String token = jwtTokenProvider.generateToken(newUser);
    return new CreateUserResponse().token(new AuthResponse(token));
  }
}
