package ru.semernik.olga.paperservice.io.input;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.semernik.olga.paperservice.service.FullReportService;

@Controller("/fullreport")
@RequiredArgsConstructor
public class FullReportController {


  private final FullReportService fullReportService;

  @GetMapping(path = "/get/{reportId}")
  public String getReport(@PathVariable("reportId") Long reportId, Model model) {
    var report = fullReportService.getReport(reportId);
    model.addAttribute("reportData", report);

    return "report";
  }
}
