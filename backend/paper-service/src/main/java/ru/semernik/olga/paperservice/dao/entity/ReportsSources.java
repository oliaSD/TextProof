package ru.semernik.olga.paperservice.dao.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reports_sources", schema = "papers_schema")
@Setter
@Getter
public class ReportsSources {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Long startPosition;

  @Column
  private Long endPosition;

  @Column
  private String url;

  @Column
  private String sourceType;

  @ManyToOne
  @JoinColumn(name = "report_id")
  private ReportEntity report;
}
