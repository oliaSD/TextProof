package org.olga.semernik.analyticservice.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.olga.semernik.analyticservice.dao.repository.PaperAnalysisRepository;
import org.springframework.stereotype.Service;

@Service
public class PaperAnalysisService {

  private final PaperAnalysisRepository paperAnalysisRepository;

  public PaperAnalysisService(PaperAnalysisRepository paperAnalysisRepository) {
    this.paperAnalysisRepository = paperAnalysisRepository;
  }

  public Map<String, Object> getUserPaperAnalysis(String username) {
    Map<String, Object> result = new HashMap<>();

    // 1. Общее количество слов
    result.put("totalWords", paperAnalysisRepository.countTotalWordsByUser(username));

    // 2. Распределение по типам
    List<Map<String, Object>> typeDistribution = paperAnalysisRepository.countPapersByTypeForUser(
        username);
    result.put("typeDistribution", typeDistribution);

    // 3. Средние показатели отчетов
    Map<String, Double> reportStats = paperAnalysisRepository.getAverageReportStatsForUser(
        username);
    result.putAll(reportStats);

    // 4. Средний размер статей
    Map<String, Double> sizeStats = paperAnalysisRepository.getAveragePaperSizeStatsForUser(
        username);
    result.put("averageWordCount", sizeStats.get("avg_word_count"));
    result.put("averageCharCount", sizeStats.get("avg_char_count"));

    // 5. Полная статистика
    Map<String, Object> completeStats = paperAnalysisRepository.getCompleteUserStats(username);
    result.put("completeStats", completeStats);
    List<Map<String, Object>> wordsCount = paperAnalysisRepository.getPaperWordCount(username);
    result.put("wordsCount", wordsCount);
    return result;
  }
}