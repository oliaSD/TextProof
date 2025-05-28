package ru.semernik.olga.paperservice.service.pdf;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DetectorCitationText {

  // Список маркеров, указывающих на цитату
  private final List<String> QUOTE_MARKERS = Arrays.asList(
      "говорил", "сказал", "утверждал", "писал", "считал",
      "по словам", "как говорится", "цитируя", "как сказано",
      "заявил", "отметил", "добавил", "повторил", "процитировал"
  );

  // Список вводных слов для косвенной речи
  private final List<String> REPORTING_VERBS = Arrays.asList(
      "что", "будто", "мол", "дескать", "де", "якобы"
  );

  // Регулярные выражения для определения цитат
  private final Pattern DIRECT_QUOTE_PATTERN = Pattern.compile(
      "([«\"'‘“]).*?([»\"'’”])|^[-–—].*|^\\s*[A-ZА-Я][^.!?]*[:]\\s*[«\"'‘“]"
  );

  private final Pattern AUTHOR_REFERENCE_PATTERN = Pattern.compile(
      "\\([сcC]\\)|©|℗|®|™|[-–—]\\s*[А-ЯA-Z][а-яa-z]+(\\s+[А-ЯA-Z][а-яa-z]+)*"
  );

  /**
   * Проверяет, является ли текст цитатой
   * @param text анализируемый текст
   * @return true, если текст похож на цитату
   */
  public boolean isQuote(String text) {
    if (text == null || text.trim().isEmpty()) {
      return false;
    }

    // Проверка прямых цитат с кавычками
//    if (containsDirectQuotation(text)) {
//      return true;
//    }

    // Проверка ссылок на автора
    if (containsAuthorReference(text)) {
      return true;
    }

    // Проверка маркеров цитирования
    if (containsQuoteMarkers(text)) {
      return true;
    }

    // Проверка косвенной речи
    return containsReportedSpeech(text);
  }

  private boolean containsDirectQuotation(String text) {
    return DIRECT_QUOTE_PATTERN.matcher(text).find();
  }

  private boolean containsAuthorReference(String text) {
    return AUTHOR_REFERENCE_PATTERN.matcher(text).find();
  }

  private boolean containsQuoteMarkers(String text) {
    String lowerText = text.toLowerCase();
    return QUOTE_MARKERS.stream().anyMatch(lowerText::contains);
  }

  private boolean containsReportedSpeech(String text) {
    String lowerText = text.toLowerCase();

    // Косвенная речь часто содержит союз "что" и глагол в прошедшем времени
    boolean hasPastTenseVerb = text.matches(
        ".*\\s(сказал|говорил|отметил|добавил|сообщил)\\s+что.*");

    return false;
  }
}

