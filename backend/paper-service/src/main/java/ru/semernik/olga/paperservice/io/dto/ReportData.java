package ru.semernik.olga.paperservice.io.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReportData {

  private ReportParams reportParams;
  private FileMetadata fileMetadata;
  private User user;
  private List<Source> sources;
  private String reportUrl;
}
