package com.example.demo;

import com.aspose.pdf.*;
import java.util.Locale;

public class ExtractParagraphs {
  public static void main(String[] args) {
    // Открываем PDF-документ
    LocaleOptions.setLocale(new Locale("ru", "RU"));
    Document doc = new Document("ТЕст.pdf");

    // Создаем объект ParagraphAbsorber
    ParagraphAbsorber absorber = new ParagraphAbsorber();

    // Применяем его ко всему документу
    absorber.visit(doc);

    // Проходим по страницам и извлекаем абзацы
    for (PageMarkup markup : absorber.getPageMarkups()) {
      for (MarkupSection section : markup.getSections()) {
        for (MarkupParagraph paragraph : section.getParagraphs()) {
          StringBuilder paragraphText = new StringBuilder();
          for (java.util.List<TextFragment> line : paragraph.getLines()) {
            for (TextFragment fragment : line) {
              paragraphText.append(fragment.getText());
            }
            paragraphText.append("\n");
          }
          System.out.println("Абзац: " + paragraphText);
        }
      }
    }
  }
}
