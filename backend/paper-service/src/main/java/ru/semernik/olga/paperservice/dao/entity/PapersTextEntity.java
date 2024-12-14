package ru.semernik.olga.paperservice.dao.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "papers_texts", schema = "papers_schema", indexes = {
    @Index(name = "papers_index", columnList = "papers_id")
})
@Setter
@Getter
public class PapersTextEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 65000)
  private String text;

  @Column(nullable = false)
  private Long size;

  @Column(nullable = false)
  private Long textOffset;

  @Column(nullable = false)
  private String hash;

  @ManyToOne
  @JoinColumn(name = "papers_id")
  private PapersEntity papers;
}
