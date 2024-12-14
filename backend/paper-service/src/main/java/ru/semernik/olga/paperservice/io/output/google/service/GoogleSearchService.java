package ru.semernik.olga.paperservice.io.output.google.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.io.output.google.client.GoogleSearchClient;
import ru.semernik.olga.paperservice.io.output.google.dto.SearchResponse;


@Service
@Getter
@Setter
@RequiredArgsConstructor
public class GoogleSearchService {

  private final GoogleSearchClient googleSearchClient;

  public SearchResponse search(String searchString) {
    return googleSearchClient.search(searchString).toEntity(SearchResponse.class).getBody();
  }
}
