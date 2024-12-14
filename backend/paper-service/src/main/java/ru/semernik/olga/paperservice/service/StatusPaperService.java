package ru.semernik.olga.paperservice.service;

import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.exception.BasePaperException;
import ru.semernik.olga.paperservice.paper.dto.StatusPaperResponse;
import ru.semernik.olga.paperservice.paper.dto.StatusPaperResponse.StatusEnum;
import ru.semernik.olga.paperservice.service.common.ReportEntityService;

@Service
@RequiredArgsConstructor
public class StatusPaperService {

  private final ReportEntityService reportEntityService;

  private StatusPaperResponse statusPaperResponse(ReportEntity reportEntity) {
    var statusPaperResponse = new StatusPaperResponse();
    if (reportEntity.getReportsParams() == null) {
      statusPaperResponse.status(StatusEnum.CHECK);
    } else {
      statusPaperResponse.status(StatusEnum.FINISH_CHECK);
    }
    statusPaperResponse.fileName(reportEntity.getPapers().getPapersAttribute().getFileName());
    statusPaperResponse.paperId(new BigDecimal(reportEntity.getPapers().getId()));
    statusPaperResponse.reportId(new BigDecimal(reportEntity.getId()));
    return statusPaperResponse;
  }

  public StatusPaperResponse getPaperStatus(String username, Long paperId) {
    ReportEntity reportEntity = reportEntityService.getReportEntityByPaperId(paperId)
        .orElseThrow(() -> new BasePaperException(
            HttpStatus.BAD_REQUEST, "Paper not found"));
    return statusPaperResponse(reportEntity);
  }

  public List<StatusPaperResponse> getAllPaperStatus(String username) {
    return reportEntityService.findAllByUserName(username).stream().map(this::statusPaperResponse)
        .toList();
  }
}
