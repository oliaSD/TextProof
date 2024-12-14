package ru.semernik.olga.paperservice.io.output.google.client;

import java.nio.charset.StandardCharsets;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.ResponseSpec;
import ru.semernik.olga.paperservice.configuration.googlesearch.GoogleSearchConfig;

@Component
@Getter
@Setter
@RequiredArgsConstructor
public class GoogleSearchClient {

  private final RestClient googleRestClient;
  private final GoogleSearchConfig googleSearchConfig;

  public ResponseSpec search(String query) {
    return googleRestClient
        .get(
        )
        .uri((uriBuilder ->
            uriBuilder
                .host(googleSearchConfig.getRootUri())
                .scheme("https")
                .path(googleSearchConfig.getPath())
                .queryParam("q", query)
                .queryParam("key", googleSearchConfig.getApi())
                .queryParam("cx", googleSearchConfig.getCx())
                .build()))
        .acceptCharset(StandardCharsets.UTF_8)
        .accept(MediaType.APPLICATION_JSON)
        .retrieve();
  }
}
