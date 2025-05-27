package org.olga.semernik.analyticservice.dao.repository;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaperAnalysisRepository extends JpaRepository<PaperEntity, Long> {

  // 1. Общее количество слов для пользователя (нативный SQL)
  @Query(value = """
      SELECT COALESCE(SUM(pa.word_count), 0) 
      FROM papers p
      JOIN papers_attributes pa ON p.papers_attributes_id = pa.id
      WHERE p.owner_name = :username
      """, nativeQuery = true)
  Long countTotalWordsByUser(@Param("username") String username);

  // 2. Распределение статей по типам (нативный SQL)
  @Query(value = """
      SELECT p.type AS paper_type, COUNT(p.id) AS count
      FROM papers p
      WHERE p.owner_name = :username
      GROUP BY p.type
      """, nativeQuery = true)
  List<Map<String, Object>> countPapersByTypeForUser(@Param("username") String username);

  // 3. Средние показатели отчетов (нативный SQL)
  @Query(value = """
      SELECT 
          COALESCE(AVG(rp.original_percentage), 0) AS avg_originality,
          COALESCE(AVG(rp.borrowing_percentage), 0) AS avg_borrowing,
          COALESCE(AVG(rp.citation_percentage), 0) AS avg_citation
      FROM papers p
      LEFT JOIN reports r ON p.report_id = r.id
      LEFT JOIN reports_params rp ON r.id = rp.report_id
      WHERE p.owner_name = :username
      """, nativeQuery = true)
  Map<String, Double> getAverageReportStatsForUser(@Param("username") String username);

  // 4. Средний размер статей (в символах и словах) - нативный SQL
  @Query(value = """
      SELECT 
          COALESCE(AVG(pa.word_count), 0) AS avg_word_count,
          COALESCE(AVG(LENGTH(pt.text)), 0) AS avg_char_count
      FROM papers p
      JOIN papers_attributes pa ON p.papers_attributes_id = pa.id
      JOIN papers_texts pt ON pt.papers_id = p.id
      WHERE p.owner_name = :username
      """, nativeQuery = true)
  Map<String, Double> getAveragePaperSizeStatsForUser(@Param("username") String username);

  // 5. Полная статистика по пользователю (нативный SQL)
  @Query(value = """
      SELECT 
          COUNT(distinct p.id) AS total_papers,
          COALESCE(SUM(pa.word_count), 0) AS total_words,
          COALESCE(AVG(pa.word_count), 0) AS avg_words_per_paper,
          COALESCE(sum(LENGTH(pt.text)), 0) AS avg_chars_per_paper,
          COALESCE(AVG(rp.original_percentage), 0) AS avg_originality,
          COALESCE(AVG(rp.borrowing_percentage), 0) AS avg_borrowing,
          COALESCE(AVG(rp.citation_percentage), 0) AS avg_citation
      FROM papers p
      JOIN papers_attributes pa ON p.papers_attributes_id = pa.id
      JOIN papers_texts pt ON pt.papers_id = p.id
      LEFT JOIN reports r ON p.report_id = r.id
      LEFT JOIN reports_params rp ON r.id = rp.report_id
      WHERE p.owner_name = :username
      """, nativeQuery = true)
  Map<String, Object> getCompleteUserStats(@Param("username") String username);

  @Query(value = """
      SELECT
          pa.word_count AS total_words,
          pa.name as paper_name
      FROM papers p
      JOIN papers_attributes pa ON p.papers_attributes_id = pa.id
      WHERE p.owner_name = :username
      """, nativeQuery = true)
  List<Map<String, Object>> getPaperWordCount(@Param("username") String username);
}