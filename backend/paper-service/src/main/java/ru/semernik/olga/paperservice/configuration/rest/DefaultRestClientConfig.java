package ru.semernik.olga.paperservice.configuration.rest;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.FractionalSeconds;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "api.internal.default")
@Getter
@Setter
public class DefaultRestClientConfig {
  private String timeout;
  private String maxConnections;
}
