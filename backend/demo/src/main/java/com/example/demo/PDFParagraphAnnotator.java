package com.example.demo;

import java.util.ArrayList;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationTextMarkup;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class PDFParagraphAnnotator {
  public static void main(String[] args) throws IOException {
    try (PDDocument document =    PDDocument.load(new File("/Users/viktorkabariha/Downloads/Kabariha_Neural_networks.pdf"))) {
      PDFTextStripper stripper = new PDFTextStripper() {
        private String currentParagraph = "";
        private final List<TextPosition> currentParagraphPositions = new ArrayList<>();

        @Override
        protected void writeString(String text, List<TextPosition> textPositions) throws IOException {

          currentParagraph += text;
          currentParagraphPositions.addAll(textPositions);

          // Если встречаем два переноса строки подряд — считаем это концом абзаца
          if (text.trim().isEmpty() && currentParagraph.contains("\n\n")) {
            processParagraph(currentParagraph, currentParagraphPositions);
            currentParagraph = "";
            currentParagraphPositions.clear();
          }
        }

        @Override
        protected void writeLineSeparator() throws IOException {
          currentParagraph += "\n";
        }

        private void processParagraph(String paragraph, List<TextPosition> positions) {
          if (paragraph.contains("Классические методы определения лиц.")) {
            try {
              PDPage page = getCurrentPage();
              if (positions.isEmpty()) return;

              TextPosition first = positions.get(0);
              TextPosition last = positions.get(positions.size() - 1);

              // Создаем прямоугольник для выделения всего абзаца
              PDRectangle rect = new PDRectangle(
                  first.getX(),
                  last.getY() - last.getHeight(),
                  last.getX() + last.getWidth() - first.getX(),
                  first.getY() - last.getY() + last.getHeight()
              );

              // Добавляем аннотацию
              PDAnnotationTextMarkup markup = new PDAnnotationTextMarkup(PDAnnotationTextMarkup.SUB_TYPE_HIGHLIGHT);
              markup.setRectangle(rect);
              markup.setQuadPoints(new float[]{
                  rect.getLowerLeftX(), rect.getLowerLeftY(),
                  rect.getUpperRightX(), rect.getLowerLeftY(),
                  rect.getLowerLeftX(), rect.getUpperRightY(),
                  rect.getUpperRightX(), rect.getUpperRightY()
              });
              markup.setContents("Комментарий к абзацу");

              page.getAnnotations().add(markup);
            } catch (IOException e) {
              e.printStackTrace();
            }
          }
        }
      };

      stripper.setSortByPosition(true); // Для корректного определения координат
      for (int i = 0; i < document.getNumberOfPages(); i++) {
        stripper.setStartPage(i + 1);
        stripper.setEndPage(i + 1);
        stripper.getText(document);
      }

      document.save("output_with_paragraph_comments.pdf");
    }
  }
}