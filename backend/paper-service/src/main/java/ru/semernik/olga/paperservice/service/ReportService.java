package ru.semernik.olga.paperservice.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.exception.BasePaperException;
import ru.semernik.olga.reports.dto.FileMetadata;
import ru.semernik.olga.paperservice.service.common.ReportEntityService;
import ru.semernik.olga.reports.dto.GetReportResponse;
import ru.semernik.olga.reports.dto.Report;
import ru.semernik.olga.reports.dto.ReportParams;
import ru.semernik.olga.reports.dto.ReportSources;
import ru.semernik.olga.reports.dto.ReportSources.SourceTypeEnum;

@Service
@RequiredArgsConstructor
public class ReportService {

  private final ReportEntityService reportEntityService;

  public GetReportResponse getReport(String reportId) {
    Optional<ReportEntity> reportEntity = reportEntityService.getReportEntityById(
        Long.decode(reportId));
    return reportEntity.filter(e -> e.getReportsParams() != null).map(this::getReportResponse)
        .orElseThrow(() -> new BasePaperException(
            HttpStatus.NOT_FOUND, "report not found"));
  }


  private GetReportResponse getReportResponse(ReportEntity reportEntity) {
    ReportParams reportParams = new ReportParams();
    reportParams.borrowingPercentage(
        BigDecimal.valueOf(reportEntity.getReportsParams().getBorrowingPercentage()));
    reportParams.citationPercentage(
        BigDecimal.valueOf(reportEntity.getReportsParams().getCitationPercentage()));
    reportParams.originalPercentage(
        BigDecimal.valueOf(reportEntity.getReportsParams().getOriginalPercentage()));
    List<ReportSources> sources = new ArrayList<>();
    reportEntity.getReportsSources().forEach(reportSource -> {
      ReportSources reportSources = new ReportSources();
      reportSources.borrowingText("text");
      reportSources.sourceType(SourceTypeEnum.WEB);
      reportSources.sourceUrl(reportSource.getUrl());
      sources.add(reportSources);
    });
    FileMetadata fileMetadata = new FileMetadata();
    fileMetadata.paperId(reportEntity.getId());
    fileMetadata.fileName(reportEntity.getPapers().getPapersAttribute().getFileName());
    fileMetadata.fileExtension(reportEntity.getPapers().getPapersAttribute().getFileExtension());
    fileMetadata.size(reportEntity.getPapers().getPapersAttribute().getSize());
    fileMetadata.wordCount(reportEntity.getPapers().getPapersAttribute().getWordCount());
    fileMetadata.createdDate(reportEntity.getPapers().getPapersAttribute().getCreated().toString());
    Report report = new Report();
    report.fileMetadata(fileMetadata);
    report.setReportSources(sources);
    report.setReportId(reportEntity.getId());
    report.setPaperId(reportEntity.getPapers().getId());
    report.setReportParams(reportParams);
    GetReportResponse getReportResponse = new GetReportResponse();
    getReportResponse.report(report);
    return getReportResponse;
  }

  public List<GetReportResponse> getAllReports(String username) {
    List<ReportEntity> reports = reportEntityService.findAllByUserName(username);
    if (reports.isEmpty()) {
      return new ArrayList<>();
    }
    return reports.stream().filter(e -> e.getReportsParams() != null).map(this::getReportResponse)
        .toList();
  }
}
