package org.olga.semernik.groupservice.service;

import java.net.URI;
import java.net.URL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.olga.semernik.groupservice.configuration.email.EmailConfigProps;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserMailSenderService {

  private final JavaMailSender javaMailSender;

  private final EmailConfigProps emailConfigProps;

  public void sendSimpleMail(String to, String subject, String groupId, String username) {
    var message = new SimpleMailMessage();
    message.setTo(to);
    message.setFrom("TextProof");
    String uri = UriComponentsBuilder
        .fromUri(URI.create(emailConfigProps.getBaseUrl()))
        .path("/groups/{groupId}/{username}")
        .buildAndExpand(groupId, username).toUriString();
    message.setText(uri);
    message.setSubject(subject);
    log.info("Sending email {}", message);
    javaMailSender.send(message);
  }
}
