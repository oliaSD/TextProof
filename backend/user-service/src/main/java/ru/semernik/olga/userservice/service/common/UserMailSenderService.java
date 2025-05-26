package ru.semernik.olga.userservice.service.common;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ru.semernik.olga.userservice.configuration.email.EmailConfigProps;

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
    context.setVariable("confirmationLink", emailConfigProps.getBaseUrl() + confirmationLink);
    context.setVariable("serviceName", serviceName);
    context.setVariable("expirationHours", expirationHours);

    String htmlContent = templateEngine.process("email/registration-email", context);

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


  public void sendSimpleMail(String to, String subject, String text) {
    var message = new SimpleMailMessage();
    message.setTo(to);
    message.setFrom("TextProof");
    message.setText(emailConfigProps.getBaseUrl() + text);
    message.setSubject(subject);
    log.info("Sending email {}", message);
    javaMailSender.send(message);
  }
}
