package org.olga.semernik.mailservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.olga.semernik.mailservice.email.EmailConfigProps;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserMailSenderService {

  private final JavaMailSender javaMailSender;

  private final EmailConfigProps emailConfigProps;

  private final TemplateEngine templateEngine;


  public void sendRegistrationConfirmation(
      String toEmail,
      String username,
      String confirmationLink,
      String serviceName,
      int expirationHours) {

    String subject = "Подтверждение регистрации";

    Context context = new Context();
    context.setVariable("username", username);
    context.setVariable("confirmationLink", emailConfigProps.getUserUrl() + confirmationLink);
    context.setVariable("serviceName", serviceName);
    context.setVariable("expirationHours", expirationHours);

    String htmlContent = templateEngine.process("registration-email", context);

    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = null;
    try {
      helper = new MimeMessageHelper(message, true, "UTF-8");
      helper.setTo(toEmail);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
    javaMailSender.send(message);
  }

  public void sendConfirmationGroup(String email, String activationCode) {
    String subject = "Подтверждение регистрации";

    Context context = new Context();
    context.setVariable("link", emailConfigProps.getGroupUrl() + activationCode);

    String htmlContent = templateEngine.process("group", context);

    MimeMessage message = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = null;
    try {
      helper = new MimeMessageHelper(message, true, "UTF-8");
      helper.setTo(email);
      helper.setSubject(subject);
      helper.setText(htmlContent, true);

    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
    javaMailSender.send(message);
  }
}
