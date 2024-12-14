package ru.semernik.olga.paperservice.io.output.websearch.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.io.output.websearch.client.WebSearchClient;
import ru.semernik.olga.websearch.dto.WebSearchResponse;

@Service
@RequiredArgsConstructor
public class WebSearchService {

  private final WebSearchClient webSearchClient;

  public List<WebSearchResponse> search(String text, Integer limit, String lang) {
    return webSearchClient.search(text, limit, lang);
  }
}
