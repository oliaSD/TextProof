package org.olga.semernik.analyticservice.controller.dto;

import java.util.Map;
import org.olga.semernik.analyticservice.service.PaperAnalysisService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analysis")
@CrossOrigin(origins = "http://localhost:3000")
public class PaperAnalysisController {

  private final PaperAnalysisService paperAnalysisService;

  public PaperAnalysisController(PaperAnalysisService paperAnalysisService) {
    this.paperAnalysisService = paperAnalysisService;
  }

  @GetMapping("/user/{username}")
  public Map<String, Object> getUserPaperAnalysis(@PathVariable String username) {
    return paperAnalysisService.getUserPaperAnalysis(username);
  }
}