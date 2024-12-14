package ru.semernik.olga.paperservice.service;

import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;
import ru.semernik.olga.paperservice.dao.entity.PapersTextEntity;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.paper.dto.CheckPaperResponse;
import ru.semernik.olga.paperservice.paper.dto.CheckPaperResponse.StatusEnum;
import ru.semernik.olga.paperservice.service.common.AsyncCheckService;
import ru.semernik.olga.paperservice.service.common.PaperEntityService;
import ru.semernik.olga.paperservice.service.common.ReportEntityService;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckPaperService {

  private final PaperEntityService paperEntityService;

  private final ReportEntityService reportEntityService;

  private final AsyncCheckService asyncCheckService;


  public CheckPaperResponse check(Long paperId, String username) {
    PapersEntity papers = paperEntityService.findById(paperId);
    if (papers.getReport() == null) {
      ReportEntity reportEntity = new ReportEntity();
      reportEntity.setPercent(BigDecimal.ZERO);
      papers.setReport(reportEntity);
      reportEntity.setPapers(papers);
      reportEntityService.saveReportEntity(reportEntity);
      List<String> paragraphs = papers.getPapersTexts().stream().map(PapersTextEntity::getText)
          .toList();
      asyncCheckService.check(paragraphs, reportEntity);
      CheckPaperResponse checkPaperResponse = new CheckPaperResponse();
      checkPaperResponse.reportId(reportEntity.getId());
      checkPaperResponse.status(StatusEnum.CHECK);
      return checkPaperResponse;
    } else if (papers.getReport().getReportsParams() == null) {
      CheckPaperResponse checkPaperResponse = new CheckPaperResponse();
      checkPaperResponse.reportId(papers.getReport().getId());
      checkPaperResponse.status(StatusEnum.CHECK);
      return checkPaperResponse;
    }
    CheckPaperResponse checkPaperResponse = new CheckPaperResponse();
    checkPaperResponse.reportId(papers.getReport().getId());
    checkPaperResponse.status(StatusEnum.FINISH_CHECK);
    return checkPaperResponse;
  }
}


