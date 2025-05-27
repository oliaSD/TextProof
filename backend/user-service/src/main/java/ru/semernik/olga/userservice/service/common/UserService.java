package ru.semernik.olga.userservice.service.common;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.dao.entity.UserActiveStatus;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.repository.UserRepository;
import ru.semernik.olga.userservice.exception.CreateUserException;
import ru.semernik.olga.userservice.mapper.UserMapper;
import ru.semernik.olga.userservice.user.dto.CreateUserRequest;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse;
import ru.semernik.olga.userservice.user.dto.ToggleUserBlockRequest;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

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

  public InfoUserResponse getUserByUsername(String username) {
    return UserMapper.toInfoUserResponse(userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found")));
  }

  public Void updateUserInfo(CreateUserRequest createUserRequest) {
    var findUser = findUserByUsername(createUserRequest.getUsername()).orElseThrow(() ->
        new CreateUserException(HttpStatus.CONFLICT,
            "User with username " + createUserRequest.getUsername() + " already exists"));
    findUser.setAccountStatus(UserActiveStatus.ACTIVE);
    findUser.setPassword(bCryptPasswordEncoder.encode(createUserRequest.getPassword()));
    this.userRepository.save(findUser);
    return null;
  }

}
