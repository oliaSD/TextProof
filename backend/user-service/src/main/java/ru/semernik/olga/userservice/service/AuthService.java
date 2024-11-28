package ru.semernik.olga.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.configuration.security.JwtTokenProvider;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.exception.AuthException;
import ru.semernik.olga.userservice.service.common.UserService;
import ru.semernik.olga.userservice.user.dto.AuthRequest;
import ru.semernik.olga.userservice.user.dto.AuthResponse;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserService userService;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthResponse authenticate(AuthRequest authRequest) {
    UserEntity user = userService.findUserByUsername(authRequest.getUsername()).orElseThrow(
        () -> new AuthException(HttpStatus.FORBIDDEN, "Неверный логин или пароль")
    );
    var pas = passwordEncoder.encode(authRequest.getPassword());
    if (passwordEncoder.matches(pas, user.getPassword())) {
      throw new AuthException(HttpStatus.FORBIDDEN, "Неверный логин или пароль");
    }
    return new AuthResponse(jwtTokenProvider.generateToken(user));
  }

}
