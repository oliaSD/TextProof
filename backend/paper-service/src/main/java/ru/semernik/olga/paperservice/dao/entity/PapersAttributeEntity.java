package ru.semernik.olga.paperservice.dao.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "papers_attributes")
@Setter
@Getter
public class PapersAttributeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, name = "text_size")
  private Long size;

  @Column()
  private String authors;

  @Column(nullable = false)
  private String hash;

  @Column(nullable = false)
  private Boolean isShared;

  @Column(nullable = false)
  private Boolean isSource;

  @Column(nullable = false)
  private LocalDateTime created;

  @Column(nullable = false)
  private Long wordCount;

  @Column(nullable = false, name = "name")
  private String fileName;

  @OneToOne(mappedBy = "papersAttribute")
  private PapersEntity papers;
}
