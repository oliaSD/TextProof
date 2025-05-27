package org.olga.semernik.groupservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.olga.semernik.groupservice.controller.dto.EmailRequest;
import org.olga.semernik.groupservice.controller.feignClient.EmailFeignClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserMailSenderService {

  private final EmailFeignClient emailFeignClient;


  public void sendSimpleMail(String to, String subject, String groupId, String username) {
    emailFeignClient.sendToUser(
        EmailRequest.builder().email(to).activationCode(groupId + "/" + username).username(username)
            .build());
  }
}
