package ru.semernik.olga.paperservice.dao.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.sql.Time;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reports_params", schema = "papers_schema")
@Setter
@Getter
public class ReportsParams {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private LocalDateTime created;

  @Column
  private LocalDateTime updated;

  @Column
  private Double originalPercentage;

  @Column
  private Double borrowingPercentage;

  @Column
  private Double citationPercentage;

  @Column
  private Long endPosition;

  @Column
  private Time checkTime;

  @OneToOne
  @JoinColumn(name = "report_id")
  private ReportEntity report;
}
