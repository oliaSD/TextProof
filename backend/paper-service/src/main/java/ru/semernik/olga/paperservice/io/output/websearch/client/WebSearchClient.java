package ru.semernik.olga.paperservice.io.output.websearch.client;

import static org.apache.commons.codec.CharEncoding.UTF_8;

import java.nio.charset.Charset;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;
import ru.semernik.olga.paperservice.configuration.rest.WebSearchRestClientConfig;
import ru.semernik.olga.websearch.dto.WebSearchResponse;

@Component
@RequiredArgsConstructor
public class WebSearchClient {

  private final WebSearchRestClientConfig webSearchRestClientConfig;

  private final RestClient restClient;

  public List<WebSearchResponse> search(String text, Integer limit, String lang) {
    List<WebSearchResponse> result = restClient.get()
        .uri(
            UriComponentsBuilder.fromUriString(
                    webSearchRestClientConfig.getBaseUrl() + webSearchRestClientConfig.getGoogle())
                .queryParam("text", text)
                .queryParam("limit", limit)
                .queryParam("lang", lang)
                .build()
                .toUri())
        .accept(MediaType.APPLICATION_JSON)
        .acceptCharset(Charset.forName(UTF_8))
        .retrieve()
        .body(new ParameterizedTypeReference<>() {
        });
    if (result == null || result.isEmpty()) {
      return List.of();
    }
    return result;
  }
}
