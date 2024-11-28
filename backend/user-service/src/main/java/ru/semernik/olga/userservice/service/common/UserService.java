package ru.semernik.olga.userservice.service.common;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public Optional<UserEntity> findUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public boolean checkUserEmail(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public UserEntity saveUser(UserEntity user) {
    return userRepository.save(user);
  }
}
