package org.olga.semernik.groupservice.service;

import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.olga.semernik.groupservice.controller.feignClient.UserFeignClient;
import org.olga.semernik.groupservice.dao.entities.Group;
import org.olga.semernik.groupservice.dao.entities.User;
import org.olga.semernik.groupservice.dao.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.semernik.olga.groupservice.group.dto.FindUserResponse;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  private final UserFeignClient userFeignClient;

  @Transactional
  public User getUserByUsername(String username) {
    var findUser = userRepository.findByUsername(username);
    if (findUser.isPresent()) {
      return findUser.get();
    }
    var newFindUser = userFeignClient.findUser(username);
    return getAndSaveUserFromUserService(newFindUser);
  }

  @Transactional
  public User getUserByEmail(String email) {
    var findUser = userRepository.findByEmail(email);
    if (findUser.isPresent()) {
      return findUser.get();
    }
    var newFindUser = userFeignClient.findUserByEmail(email);
    return getAndSaveUserFromUserService(newFindUser);
  }

  @NotNull
  private User getAndSaveUserFromUserService(FindUserResponse newFindUser) {
    if (newFindUser == null || newFindUser.getUser() == null) {
      throw new IllegalArgumentException("User not found");
    }
    var newUser = User.builder().username(newFindUser.getUser().getUsername())
        .email(newFindUser.getUser().getEmail()).adminGroups(new HashSet<>())
        .groups(new HashSet<>()).build();
    userRepository.save(newUser);
    return newUser;
  }

  @Transactional
  public List<Group> getUserGroups(String username) {
    User user = getUserByUsername(username);
    return user.getGroups().stream().toList();
  }

  @Transactional
  public List<Group> getUserAdminGroups(String username) {
    User user = getUserByUsername(username);
    return user.getAdminGroups().stream().toList();
  }
}