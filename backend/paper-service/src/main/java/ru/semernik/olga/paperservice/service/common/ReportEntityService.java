package ru.semernik.olga.paperservice.service.common;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.dao.entity.ReportsParams;
import ru.semernik.olga.paperservice.dao.entity.ReportsSources;
import ru.semernik.olga.paperservice.dao.repository.ReportRepository;
import ru.semernik.olga.paperservice.dao.repository.ReportsParamsRepository;
import ru.semernik.olga.paperservice.dao.repository.ReportsSourcesRepository;

@Service
@RequiredArgsConstructor
public class ReportEntityService {

  private final ReportRepository reportRepository;
  private final ReportsParamsRepository reportsParamsRepository;
  private final ReportsSourcesRepository reportsSourcesRepository;

  public Optional<ReportEntity> getReportEntityByPaperId(Long paperId) {
    return reportRepository.findByPapersId(paperId);
  }

  public Optional<ReportEntity> getReportEntityById(Long reportId) {
    return reportRepository.findById(reportId);
  }

  public ReportEntity saveReportEntity(ReportEntity reportEntity) {
    return reportRepository.save(reportEntity);
  }

  public List<ReportsSources> saveReportsSources(List<ReportsSources> reportsSourcesList) {
    return reportsSourcesRepository.saveAll(reportsSourcesList);
  }

  public ReportsParams saveReportParams(ReportsParams reportsParams) {
    return reportsParamsRepository.save(reportsParams);
  }

  public List<ReportEntity> findAllByUserName(String userName) {
    return reportRepository.findAllByPapersUsername(userName);
  }
}
