package ru.semernik.olga.paperservice.dao.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reports", schema = "papers_schema")
@Setter
@Getter
public class ReportEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String type;

  @Column
  private String name;

  @Column
  private BigDecimal percent;

  @OneToOne(mappedBy = "report")
  private PapersEntity papers;

  @OneToOne(mappedBy = "report", cascade = CascadeType.ALL)
  private ReportsParams reportsParams;

  @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
  private List<ReportsSources> reportsSources;


}