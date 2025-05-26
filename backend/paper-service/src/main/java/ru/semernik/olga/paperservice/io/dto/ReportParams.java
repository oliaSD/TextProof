package ru.semernik.olga.paperservice.io.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReportParams {

  private double originalPercentage;
  private double borrowingPercentage;
  private double citationPercentage;
}
