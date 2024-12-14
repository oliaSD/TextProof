package ru.semernik.olga.paperservice.service.common;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebParserService {

  public List<String> parse(String url) {
    Document document;
    try {
      document = Jsoup.connect(url).get();
      Elements paragraphs = document.select("p");
      return paragraphs.eachText();
    } catch (IOException ignored) {
    }
    return Collections.emptyList();
  }
}
