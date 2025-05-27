package ru.semernik.olga.paperservice.io.input;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.semernik.olga.paperservice.service.FullReportService;

@Controller
@RequestMapping("/full/report")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FullReportController {


  private final FullReportService fullReportService;

  @GetMapping(path = "/get/{reportId}")
  public String getReport(@PathVariable("reportId") Long reportId, Model model) {
    var report = fullReportService.getReport(reportId);
    model.addAttribute("reportData", report);

    return "report";
  }

  @GetMapping(path = "/paper/{reportId}")
  @ResponseBody
  public ResponseEntity<Object> getPaperReport(@PathVariable("reportId") Long reportId)
      throws IOException {
    Path uploadPath = Paths.get("report/pdf/");

    String fileName = "report_document_" + reportId + ".pdf";
    Path filePath = uploadPath.resolve(fileName);
    File file = filePath.toFile(); // Укажите путь к PDF-файлу
    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
        .contentType(MediaType.APPLICATION_PDF)
        .contentLength(file.length())
        .body(resource);
  }
}
