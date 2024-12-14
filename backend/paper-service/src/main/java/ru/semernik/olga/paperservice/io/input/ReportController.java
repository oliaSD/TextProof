package ru.semernik.olga.paperservice.io.input;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.paperservice.service.ReportService;
import ru.semernik.olga.reports.ReportsApi;
import ru.semernik.olga.reports.dto.GetReportResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController implements ReportsApi {

  private final ReportService reportService;

  @Override
  public ResponseEntity<GetReportResponse> get(String username, String reportId) {
    return ResponseEntity.ok(reportService.getReport(reportId));
  }

  @Override
  public ResponseEntity<List<GetReportResponse>> getAll(String username) {
    return ResponseEntity.ok(reportService.getAllReports(username));
  }
}
