package org.olga.semernik.mailservice.controller;


import lombok.RequiredArgsConstructor;
import org.olga.semernik.mailservice.service.UserMailSenderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/send")
@RequiredArgsConstructor
public class MailController {

  private final UserMailSenderService userMailSenderService;

  @PostMapping("/user")
  public ResponseEntity<Void> sendToUser(@RequestBody EmailRequest emailRequest) {
    userMailSenderService.sendRegistrationConfirmation(emailRequest.getEmail(),
        emailRequest.getUsername(), emailRequest.getActivationCode(), "TextProof", 24);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/group")
  public ResponseEntity<Void> sendToGroup(@RequestBody EmailRequest emailRequest) {
    userMailSenderService.sendConfirmationGroup(emailRequest.getEmail(),
        emailRequest.getActivationCode());
    return ResponseEntity.ok().build();
  }
}
