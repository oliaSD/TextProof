package ru.semernik.olga.paperservice.configuration.rest;


import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "api.internal.web-search")
@Getter
@Setter
public class WebSearchRestClientConfig {

  private String google;
  private String yandex;
  private String baseUrl;
  private Integer readTimeout;
  private Integer connectTimeout;
}
