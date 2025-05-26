package ru.semernik.olga.paperservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;
import ru.semernik.olga.paperservice.exception.BasePaperException;
import ru.semernik.olga.paperservice.service.common.ReportEntityService;
import ru.semernik.olga.paperservice.utils.TestFactory;
import ru.semernik.olga.reports.dto.GetReportResponse;

public class ReportServiceTest {

  @Mock
  private ReportEntityService reportEntityService;

  @InjectMocks
  private ReportService reportService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGetReport_Success() {
    String reportId = "1";
    ReportEntity mockReportEntity = TestFactory.factory.manufacturePojo(ReportEntity.class);
    when(reportEntityService.getReportEntityById(Long.decode(reportId)))
        .thenReturn(Optional.of(mockReportEntity));

    GetReportResponse response = reportService.getReport(reportId);
    assertNotNull(response);
    assertEquals(mockReportEntity.getId(), response.getReport().getReportId());
  }

  @Test
  public void testGetReport_NotFound() {
    String reportId = "1";

    when(reportEntityService.getReportEntityById(Long.decode(reportId)))
        .thenReturn(Optional.empty());

    assertThrows(BasePaperException.class, () -> reportService.getReport(reportId));
  }

  @Test
  public void testGetAllReports() {
    String username = "test_user";

    // Mock возвращаемый список ReportEntity
    List<ReportEntity> mockReportEntities = List.of(
        TestFactory.factory.manufacturePojo(ReportEntity.class));
    when(reportEntityService.findAllByUserName(username)).thenReturn(mockReportEntities);

    List<GetReportResponse> responses = reportService.getAllReports(username);

    // Проверьте, что response не пуст и содержит все ожидаемые отчеты
    assertNotNull(responses);
    assertEquals(mockReportEntities.size(), responses.size());
  }

  @Test
  public void testGetAllReports_NoReports() {
    String username = "test_user";

    when(reportEntityService.findAllByUserName(username)).thenReturn(new ArrayList<>());

    List<GetReportResponse> responses = reportService.getAllReports(username);

    assertNotNull(responses);
    Assertions.assertTrue(responses.isEmpty());
  }
}