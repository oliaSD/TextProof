package ru.semernik.olga.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.configuration.security.JwtTokenProvider;
import ru.semernik.olga.userservice.dao.entity.UserActiveStatus;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.entity.UserRole;
import ru.semernik.olga.userservice.exception.CreateUserException;
import ru.semernik.olga.userservice.service.common.UserMailSenderService;
import ru.semernik.olga.userservice.service.common.UserService;
import ru.semernik.olga.userservice.user.dto.AuthResponse;
import ru.semernik.olga.userservice.user.dto.CreateUserRequest;
import ru.semernik.olga.userservice.user.dto.CreateUserResponse;
import ru.semernik.olga.userservice.utils.GenerateActivatedCode;

@Service
@RequiredArgsConstructor
public class CreateUserService {

  private final UserService userService;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserMailSenderService userMailSenderService;

  public CreateUserResponse createUser(CreateUserRequest request) {
    return createUserWithRole(request, UserRole.ROLE_USER, UserActiveStatus.NOACTIVE, true);
  }

  public CreateUserResponse createAdmin(CreateUserRequest request) {
    return createUserWithRole(request, UserRole.ROLE_ADMIN, UserActiveStatus.ACTIVE, false);
  }

  private CreateUserResponse createUserWithRole(CreateUserRequest request,
      UserRole role,
      UserActiveStatus status,
      boolean needsActivation) {
    validateUserDoesNotExist(request);

    UserEntity newUser = buildUserEntity(request, role, status, needsActivation);
    userService.saveUser(newUser);

    String token = jwtTokenProvider.generateToken(newUser);
    sendActivationEmailIfNeeded(newUser, needsActivation);

    return new CreateUserResponse().token(new AuthResponse(token));
  }

  private void validateUserDoesNotExist(CreateUserRequest request) {
    if (userService.findUserByUsername(request.getUsername()).isPresent()) {
      throw new CreateUserException(HttpStatus.CONFLICT,
          "User with username " + request.getUsername() + " already exists");
    }

    if (userService.checkUserEmail(request.getEmail())) {
      throw new CreateUserException(HttpStatus.CONFLICT,
          "User with email " + request.getEmail() + " already exists");
    }
  }

  private UserEntity buildUserEntity(CreateUserRequest request,
      UserRole role,
      UserActiveStatus status,
      boolean needsActivation) {
    UserEntity.UserEntityBuilder builder = UserEntity.builder()
        .email(request.getEmail())
        .username(request.getUsername())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(role)
        .accountStatus(status);

    if (needsActivation) {
      builder.activateCode(GenerateActivatedCode.generateActivatedCode());
    }

    return builder.build();
  }

  private void sendActivationEmailIfNeeded(UserEntity user, boolean needsActivation) {
    if (needsActivation) {
      userMailSenderService.sendRegistrationConfirmation
          (user.getEmail(),
              user.getUsername(),
              user.getActivateCode(),
              "TextProof",
              24);
    }
  }
}