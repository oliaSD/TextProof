package ru.semernik.olga.paperservice.service.common;

import java.io.IOException;
import java.io.StringReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.ru.RussianAnalyzer;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.dao.entity.ReportsParams;
import ru.semernik.olga.paperservice.dao.entity.ReportsSources;
import ru.semernik.olga.paperservice.io.output.google.service.GoogleSearchService;
import ru.semernik.olga.paperservice.service.pdf.PDFTextHighlighter;
import ru.semernik.olga.paperservice.service.pdf.TextTokenExtractor;

@Component
@RequiredArgsConstructor
@Slf4j
public class AsyncCheckService {

  private final GoogleSearchService googleSearchService;

  private final WebParserService webParserService;

  private final ReportEntityService reportEntityService;
  private final PDFTextHighlighter pdfTextHighlighter;

  @Async
  @Transactional
  public void check(List<String> text, ReportEntity report) {
    long startTime = System.currentTimeMillis();

    ReportsParams reportsParams = new ReportsParams();
    reportsParams.setCreated(LocalDateTime.now());
    reportsParams.setUpdated(LocalDateTime.now());
    try {
      pdfTextHighlighter.highlightText(
          "uploads/pdf/document_" + report.getPapers().getId() + ".pdf",
          "report_document_" + report.getId() + ".pdf",
          text
      );
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }

    long wordCount = pdfTextHighlighter.getWordCount();
    reportsParams.setCitationPercentage((double) citation(text) / (double) wordCount * 100);
    log.info("Get citation");
    var sources = borrowing()
        .map(borrowingText -> {
          ReportsSources reportsSources = new ReportsSources();
          reportsSources.setReport(report);
          reportsSources.setSourceType("web");
          reportsSources.setUrl(borrowingText.url());
          reportsSources.setEndPosition(TextTokenExtractor.countWord(borrowingText.borrowingText()));
          reportsSources.setBorrowingPercentage(
              TextTokenExtractor.countWord(borrowingText.borrowingText()) / (double) wordCount * 100);
          return reportsSources;
        }).toList();
    log.info("Get borrowing");
    report.setReportsParams(reportsParams);
    report.setReportsSources(sources);
    reportsParams.setBorrowingPercentage(
        sources.stream().mapToDouble(ReportsSources::getEndPosition).sum()
            / (double) wordCount * 100);
    reportsParams.setOriginalPercentage(
        100d - reportsParams.getCitationPercentage() - reportsParams.getBorrowingPercentage());
    reportsParams.setReport(report);
    reportEntityService.saveReportEntity(report);
    long endTime = System.currentTimeMillis();
  }

  private Long citation(List<String> paragraphs) {
    return (long) Objects.requireNonNull(pdfTextHighlighter.getCitationText()).size();
  }

  private Stream<BorrowingText> borrowing() {
    return pdfTextHighlighter.getBorrowingText().stream().filter(BorrowingText::isBorrowingText);
  }
}

