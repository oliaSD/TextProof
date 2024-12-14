package ru.semernik.olga.paperservice.configuration.googlesearch;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class GoogleSearchConfig {

  @Value("${api.google.search.root-uri}")
  private String rootUri;

  @Value("${api.google.search.api}")
  private String api;

  @Value("${api.google.search.cx}")
  private String cx;

  @Value("${api.google.search.path}")
  private String path;
}
