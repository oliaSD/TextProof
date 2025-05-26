package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.state.PDExtendedGraphicsState;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

class PDFTextHighlighter {

  public static void highlightText(String inputPath, String outputPath, String searchText)
      throws IOException {
    try (PDDocument document = PDDocument.load(new File(inputPath))) {
      PDFTextStripper stripper = new PDFTextStripper() {

        private StringBuilder currentParagraphText = new StringBuilder();
        private List<TextPosition> textPositions = new ArrayList<>();

        @Override
        protected void writeString(String text, List<TextPosition> textPositions)
            throws IOException {

          String fullText = text.replace("\n", " ");
          this.textPositions.addAll(textPositions);// Удаляем лишние переносы строк
          currentParagraphText.append(fullText);
          super.writeString(text, textPositions);
        }

        @Override
        protected void writeParagraphEnd() throws IOException {
          if (!currentParagraphText.isEmpty()) {
            int index = currentParagraphText.indexOf(searchText);
            if (index >= 0) {
              highlightTextPosition(document, getCurrentPage(), textPositions, searchText);
            }
          }
          currentParagraphText = new StringBuilder();
          textPositions = new ArrayList<>();
          super.writeParagraphEnd();
        }
      };
      stripper.setParagraphEnd("\n\n");
      stripper.getText(document); // Запускаем анализ
      document.save(outputPath);
      System.out.println("Текст выделен успешно!");
    }
  }

  private static void highlightTextPosition(PDDocument document, PDPage page,
      List<TextPosition> textPositions, String searchText) throws IOException {
    PDRectangle mediaBox = page.getMediaBox();
    float pageHeight = mediaBox.getHeight();
    float startX = mediaBox.getWidth(), startY = mediaBox.getHeight(), endX = -1, endY = -1;
    for (TextPosition textPosition : textPositions) {

      endX = Math.max(endX, textPosition.getEndX());
      endY = Math.max(endY, textPosition.getEndY());
      startY = Math.min(startY, textPosition.getEndY());
      startX = Math.min(startX, textPosition.getEndX());
    }
    try (PDPageContentStream contentStream = new PDPageContentStream(document, page,
        PDPageContentStream.AppendMode.APPEND, true, true)) {
      PDExtendedGraphicsState graphicsState = new PDExtendedGraphicsState();
      graphicsState.setNonStrokingAlphaConstant(0.3f); // 30% прозрачность фона
      graphicsState.setStrokingAlphaConstant(0.3f); // 30% прозрачность границ

      contentStream.setGraphicsStateParameters(graphicsState); // Применяем настройки

      contentStream.setNonStrokingColor(255, 255, 0);

      float width = endX - startX;
      float height = endY-startY+textPositions.get(0).getHeightDir();

      contentStream.addRect(startX, startY, width, height);
      contentStream.fill();

    }
  }


  public static void main(String[] args) {
    try {
      String inputPdf = "output.pdf";
      String outputPdf = "output1.pdf";
      String searchText = "Два ИИ, выступающие в роли ведущих, обсуждают\n"
          + "ключевые моменты статьи, создавая динамичный и легко\n"
          + "воспринимаемый контент";

      highlightText(inputPdf, outputPdf, searchText.replace('\n', ' '));
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
