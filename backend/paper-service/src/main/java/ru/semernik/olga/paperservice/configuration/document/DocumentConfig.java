package ru.semernik.olga.paperservice.configuration.document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "api.internal.document")
public class DocumentConfig {

  private String baseUrl;

  private String fullText;
}