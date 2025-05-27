package ru.semernik.olga.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.semernik.olga.userservice.dao.entity.UserActiveStatus;
import ru.semernik.olga.userservice.dao.repository.UserRepository;
import ru.semernik.olga.userservice.exception.NotFoundUserException;
import ru.semernik.olga.userservice.io.output.dto.EmailRequest;
import ru.semernik.olga.userservice.io.output.feignClient.EmailFeignClient;
import ru.semernik.olga.userservice.user.dto.ActivateRequest;

@Service
@RequiredArgsConstructor
public class ActivateUserService {

  private final UserRepository userRepository;

  public void getActivateUser(String activateCode) {
    var findUser = userRepository.findByActivateCode(activateCode).orElseThrow(() ->
        new NotFoundUserException(HttpStatus.NOT_FOUND, "User not found")
    );
    if (findUser.getAccountStatus() != UserActiveStatus.ACTIVE) {
      findUser.setAccountStatus(UserActiveStatus.ACTIVE);
      userRepository.save(findUser);
    }
  }


}
