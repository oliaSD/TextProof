package ru.semernik.olga.userservice.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BCryptoPasswordCreate {

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public String createPassword(String password) {
    return bCryptPasswordEncoder.encode(password);
  }
}
