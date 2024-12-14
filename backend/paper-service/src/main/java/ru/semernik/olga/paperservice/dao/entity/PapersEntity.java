package ru.semernik.olga.paperservice.dao.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "papers", schema = "papers_schema")
public class PapersEntity {

  @Column(unique = true, nullable = false)
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String username;

  @Column(nullable = false)
  private String type;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "papers_attributes_id")
  private PapersAttributeEntity papersAttribute;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "report_id")
  private ReportEntity report;

  @OneToMany(mappedBy = "papers", cascade = CascadeType.ALL)
  private List<PapersTextEntity> papersTexts;
}
