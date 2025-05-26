//package com.example.demo;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.List;
//import org.apache.pdfbox.pdmodel.PDDocument;
//import org.apache.pdfbox.pdmodel.PDPage;
//import org.apache.pdfbox.pdmodel.common.PDRectangle;
//import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationTextMarkup;
//import org.apache.pdfbox.text.PDFTextStripper;
//import org.apache.pdfbox.text.TextPosition;
//import org.apache.tika.metadata.Metadata;
//import org.apache.tika.parser.AutoDetectParser;
//import org.apache.tika.parser.ParseContext;
//import org.apache.tika.parser.Parser;
//import org.apache.tika.sax.BodyContentHandler;
//
//public class PDFParagraphAnnotatorTika {
//
//  public static void main(String[] args) throws Exception {
//    String inputPdf = "soutput.pdf";
//    String outputPdf = "output.pdf";
//
//    // 1. Извлекаем текст из PDF с сохранением структуры (через Tika)
//    String fullText = extractTextWithTika(inputPdf);
//
//    // 2. Разбиваем текст на абзацы
//    String[] paragraphs = fullText.split("\n\n");
//
//    // 3. Загружаем PDF для редактирования
//    try (PDDocument document = PDDocument.load(new File(inputPdf))) {
//
//      // 4. Ищем нужные абзацы и добавляем аннотации
//      for (String paragraph : paragraphs) {
//        if (paragraph.contains("Классические методы определения лиц.")) {  // Условие поиска
//          addHighlightAnnotation(document, paragraph);
//        }
//      }
//
//      // 5. Сохраняем изменённый PDF
//      document.save(outputPdf);
//      System.out.println("Готово! Аннотации добавлены в: " + outputPdf);
//    }
//  }
//
//  /**
//   * Извлекает текст из PDF с помощью Apache Tika (лучше сохраняет абзацы).
//   */
//  private static String extractTextWithTika(String pdfPath) throws Exception {
//    try (InputStream stream = new FileInputStream(pdfPath)) {
//      Parser parser = new AutoDetectParser();
//      BodyContentHandler handler = new BodyContentHandler();
//      Metadata metadata = new Metadata();
//      parser.parse(stream, handler, metadata, new ParseContext());
//      return handler.toString();
//    }
//  }
//
//  /**
//   * Добавляет аннотацию (подсветку + комментарий) к найденному абзацу.
//   */
//  private static void addHighlightAnnotation(PDDocument document, String targetParagraph)
//      throws Exception {
//    PDFTextStripper stripper = new PDFTextStripper() {
//      private StringBuilder currentParagraph = new StringBuilder();
//      private List<TextPosition> currentPositions = new ArrayList<>();
//
//      @Override
//      protected void writeString(String text, List<TextPosition> textPositions) throws IOException {
//        currentParagraph.append(text);
//        currentPositions.addAll(textPositions);
//
//        // Если находим конец абзаца (два переноса строки)
//        if (text.trim().isEmpty() && currentParagraph.toString().contains("\n\n")) {
//          String paragraph = currentParagraph.toString().trim();
//
//          // Если абзац совпадает с искомым
//          if (paragraph.equals(targetParagraph.trim())) {
//            PDPage page = getCurrentPage();
//            if (currentPositions.isEmpty()) {
//              return;
//            }
//
//            // Получаем координаты первого и последнего символа в абзаце
//            TextPosition first = currentPositions.get(0);
//            TextPosition last = currentPositions.get(currentPositions.size() - 1);
//
//            // Создаём прямоугольник для выделения
//            PDRectangle rect = new PDRectangle(
//                first.getX(),
//                last.getY() - last.getHeight(),
//                last.getX() + last.getWidth() - first.getX(),
//                first.getY() - last.getY() + last.getHeight()
//            );
//
//            // Создаём аннотацию-подсветку
//            PDAnnotationTextMarkup highlight = new PDAnnotationTextMarkup(
//                PDAnnotationTextMarkup.SUB_TYPE_HIGHLIGHT
//            );
//            highlight.setRectangle(rect);
//            highlight.setQuadPoints(new float[]{
//                rect.getLowerLeftX(), rect.getLowerLeftY(),
//                rect.getUpperRightX(), rect.getLowerLeftY(),
//                rect.getLowerLeftX(), rect.getUpperRightY(),
//                rect.getUpperRightX(), rect.getUpperRightY()
//            });
//            highlight.setContents("Комментарий к абзацу: " + paragraph.substring(0, 20) + "...");
//
//            // Добавляем аннотацию на страницу
//            page.getAnnotations().add(highlight);
//          }
//
//          currentParagraph.setLength(0);
//          currentPositions.clear();
//        }
//      }
//    };
//
//    // Обрабатываем все страницы
//    for (int i = 0; i < document.getNumberOfPages(); i++) {
//      stripper.setStartPage(i + 1);
//      stripper.setEndPage(i + 1);
//      stripper.getText(document);
//    }
//  }
//}