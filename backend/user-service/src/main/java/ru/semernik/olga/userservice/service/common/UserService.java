package ru.semernik.olga.userservice.service.common;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.repository.UserRepository;
import ru.semernik.olga.userservice.mapper.UserMapper;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse;
import ru.semernik.olga.userservice.user.dto.ToggleUserBlockRequest;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public Optional<UserEntity> findUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public Optional<UserEntity> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public boolean checkUserEmail(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  public List<InfoUserResponse> findAllUsers() {
    return userRepository.findAll().stream().map(UserMapper::toInfoUserResponse).toList();
  }

  public UserEntity saveUser(UserEntity user) {
    return userRepository.save(user);
  }

  @Transactional
  public void toggleUserBlock(String username, ToggleUserBlockRequest toggleUserBlockRequest) {
    userRepository.updateUserStatus(username,
        UserMapper.toUserActiveStatus(toggleUserBlockRequest.getBlocked()));
  }

}
