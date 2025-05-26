package ru.semernik.olga.paperservice.service.pdf;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.documentinterchange.logicalstructure.PDStructureNode;
import org.apache.pdfbox.pdmodel.documentinterchange.logicalstructure.PDStructureTreeRoot;
import org.apache.pdfbox.pdmodel.graphics.color.PDColor;
import org.apache.pdfbox.pdmodel.graphics.color.PDDeviceRGB;
import org.apache.pdfbox.pdmodel.graphics.state.PDExtendedGraphicsState;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.service.common.BorrowingText;

@Service
@RequiredArgsConstructor
public class PDFTextHighlighter {

  private final Long maxCountResponse = 5L;

  private static final float INDENT_THRESHOLD = 55f;

  private final DetectorCitationText detectorCitationText;

  private final DetectorBorrowingText detectorBorrowingText;

  private final TextTokenExtractor textTokenExtractor;

  private final String storageDirectory = "report/pdf/";

  @Getter
  private final ArrayList<BorrowingText> borrowingText = new ArrayList<>();
  @Getter
  private final ArrayList<String> citationText = new ArrayList<>();

  @Getter
  private Long wordCount = 0L;

  public void highlightText(String inputPath, String outputPath, List<String> strings)
      throws IOException {
    try (PDDocument document = Loader.loadPDF(new File(inputPath))) {
      PDStructureTreeRoot treeRoot = document.getDocumentCatalog().getStructureTreeRoot();
      if (treeRoot != null) {
        // Документ имеет структурную разметку
        analyzeStructure(treeRoot);
      }
      PDFTextStripper stripper = new PDFTextStripper() {

        private StringBuilder currentParagraphText = new StringBuilder();
        private List<TextPosition> textPositions = new ArrayList<>();

        @Override
        protected void writeString(String text, List<TextPosition> textPositions)
            throws IOException {

          if (textPositions != null && !textPositions.isEmpty()) {

            TextPosition firstPosition = textPositions.getFirst();
            float xPosition = firstPosition.getXDirAdj();
            var currentText = currentParagraphText.toString().trim();
            if (firstPosition.getUnicode().equals(" ") || currentText.isBlank() && strings.stream().
                anyMatch(e -> e.trim().contentEquals(currentText))) {

              if (!currentText.isBlank() && strings.stream().
                  anyMatch(e -> e.trim().startsWith(currentText))) {
                String tokensText = textTokenExtractor.getTextTokens(
                    strings.stream().filter(e -> e.trim().startsWith(currentText)).findFirst()
                        .orElseGet(() -> " "));
                if (!tokensText.isEmpty() && tokensText.length() > maxCountResponse) {
                  if (detectorCitationText.isQuote(currentText)) {
                    citationText.add(tokensText);
                    highlightTextPosition(document, getCurrentPage(), textPositions,
                        new PDColor(new float[]{1.0f, 1.0f, 0.0f}, PDDeviceRGB.INSTANCE));
                  } else {
                    var result = detectorBorrowingText.isBorrowing(currentText);
                    if (result.isBorrowingText()) {
                      borrowingText.add(result);
                      highlightTextPosition(document, getCurrentPage(), this.textPositions,
                          new PDColor(new float[]{1.0f, 0.0f, 0.0f}, PDDeviceRGB.INSTANCE));
                    }
                  }
                  currentParagraphText = new StringBuilder();
                  this.textPositions = new ArrayList<>();
                }
              }
            }
          }
          String fullText = text.replace("\n", " ");
          currentParagraphText.append(fullText);
          assert textPositions != null;
          this.textPositions.addAll(textPositions);// Удаляем лишние переносы строк
          wordCount += TextTokenExtractor.countWord(text);

        }

        private void processParagraph(String paragraph) {
          System.out.println("=== Paragraph ===");
          System.out.println(paragraph.trim());
          System.out.println("===============\n");
        }

        @Override
        protected void writeParagraphEnd() throws IOException {
//          if (!currentParagraphText.isEmpty()) {
//            String tokensText = textTokenExtractor.getTextTokens(currentParagraphText.toString());
//            wordCount += tokensText.length();
//            if (!tokensText.isEmpty() && tokensText.length() > maxCountResponse) {
//              if (detectorCitationText.isQuote(tokensText)) {
//                citationText.add(tokensText);
//                highlightTextPosition(document, getCurrentPage(), textPositions,
//                    new PDColor(new float[]{1.0f, 1.0f, 0.0f}, PDDeviceRGB.INSTANCE));
//              } else {
//                var result = detectorBorrowingText.isBorrowing(tokensText);
//                if (result.isBorrowingText()) {
//                  borrowingText.add(result);
//                  highlightTextPosition(document, getCurrentPage(), textPositions,
//                      new PDColor(new float[]{1.0f, 0.0f, 0.0f}, PDDeviceRGB.INSTANCE));
//                }
//              }
//
//            }
//          }
//          currentParagraphText = new StringBuilder();
//          textPositions = new ArrayList<>();
          super.writeParagraphEnd();
        }
      };

      stripper.setParagraphStart("\n\n"); // Двойной перевод строки для абзацев
      stripper.setParagraphEnd("\n\n");
      stripper.getText(document);

      Path uploadPath = Paths.get(storageDirectory);
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }

      Path filePath = uploadPath.resolve(outputPath);
      document.save(filePath.toFile());
      System.out.println("Текст выделен успешно!");
    }
  }

  private static void analyzeStructure(PDStructureNode node) {
    // Рекурсивный анализ структуры документа
    for (Object child : node.getKids()) {
      if (child instanceof PDStructureNode childNode) {
        if ("P".equals(childNode.getType())) { // P - paragraph
          System.out.println("Found paragraph element");
        }
        analyzeStructure(childNode);
      }
    }
  }

  private void highlightTextPosition(PDDocument document, PDPage page,
      List<TextPosition> textPositions, PDColor color) throws IOException {
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

      contentStream.setNonStrokingColor(color);

      float width = endX - startX;
      float height = endY - startY + textPositions.getFirst().getHeightDir();

      contentStream.addRect(startX, startY, width, height);
      contentStream.fill();

    }
  }
}
