package org.olga.semernik.analyticservice.controller.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPaperStatsDTO {
  private Long totalPapers;
  private Long totalWords;
  private Double averageWordsPerPaper;
  private Double averageCharsPerPaper;
  private Double averageOriginality;
  private Double averageBorrowing;
  private Double averageCitation;
  private List<Long> papersWordCount;
}