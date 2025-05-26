package ru.semernik.olga.userservice.configuration.email;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "mail")
public class EmailConfigProps {

  private String baseUrl;
}
