package ru.semernik.olga.paperservice.service.pdf;

import java.io.IOException;
import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.ru.RussianAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.springframework.stereotype.Component;

@Component
public class TextTokenExtractor {

  public String getTextTokens(String paragraphs) {
    try (Analyzer analyzer = new RussianAnalyzer()) {
      TokenStream tokenStream = analyzer.tokenStream(null,
          new StringReader(String.join(" ", paragraphs)));
      CharTermAttribute charTermAttribute = tokenStream.addAttribute(CharTermAttribute.class);
      tokenStream.reset();
      StringBuilder result = new StringBuilder();
      while (tokenStream.incrementToken()) {
        result.append(charTermAttribute.toString());
        result.append(" ");
      }
      tokenStream.end();
      return result.toString();
    } catch (IOException ignored) {
    }
    return null;
  }

  public static Long countWord(String paragraphs) {
    try (Analyzer analyzer = new RussianAnalyzer()) {
      TokenStream tokenStream = analyzer.tokenStream(null, new StringReader(paragraphs));
      CharTermAttribute charTermAttribute = tokenStream.addAttribute(CharTermAttribute.class);
      tokenStream.reset();
      List<String> result = new LinkedList<>();
      while (tokenStream.incrementToken()) {
        result.add(charTermAttribute.toString());
      }
      tokenStream.end();
      return (long) result.size();
    } catch (IOException ignored) {
    }
    return 0L;
  }
}
