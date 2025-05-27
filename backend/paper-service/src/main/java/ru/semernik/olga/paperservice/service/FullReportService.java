package ru.semernik.olga.paperservice.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.semernik.olga.paperservice.dao.repository.ReportRepository;
import ru.semernik.olga.paperservice.io.dto.FileMetadata;
import ru.semernik.olga.paperservice.io.dto.ReportData;
import ru.semernik.olga.paperservice.io.dto.ReportParams;
import ru.semernik.olga.paperservice.io.dto.Source;
import ru.semernik.olga.paperservice.io.dto.User;


@Service
@RequiredArgsConstructor
public class FullReportService {

  private final ReportRepository reportRepository;

  public ReportData getReport(Long id) {
    var findReport = reportRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss")
        .withLocale(new Locale("ru", "RU"));

    String formattedDate = LocalDateTime.parse(LocalDateTime.now().toString())
        .format(formatter);
    return ReportData.builder().reportParams(
            ReportParams.builder()
                .citationPercentage(findReport.getReportsParams().getCitationPercentage())
                .originalPercentage(findReport.getReportsParams().getOriginalPercentage())
                .borrowingPercentage(findReport.getReportsParams().getBorrowingPercentage())
                .build()

        ).fileMetadata(
            FileMetadata.builder()
                .fileName(findReport.getPapers().getPapersAttribute().getFileName())
                .sentenceCount(0)
                .createdDate(formattedDate)
                .pageCount(0)
                .build()
        ).user(User.builder().username(findReport.getPapers().getOwnerName()).build())
        .reportUrl(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
        .sources(findReport.getReportsSources().stream().map(
            e -> Source.builder()
                .url(e.getUrl())
                .percentage(e.getBorrowingPercentage())
                .author(e.getSourceType())
                .build()).toList()
        ).build();

  }
}
