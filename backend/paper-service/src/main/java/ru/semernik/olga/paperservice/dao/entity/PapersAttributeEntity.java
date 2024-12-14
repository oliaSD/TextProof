package ru.semernik.olga.paperservice.dao.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "papers_attributes", schema = "papers_schema")
@Setter
@Getter
public class PapersAttributeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Long size;

  @Column()
  private String authors;

  @Column(nullable = false)
  private String hash;

  @Column(nullable = false)
  private Boolean isShare;

  @Column(nullable = false)
  private Boolean isSource;

  @Column(nullable = false)
  private LocalDateTime created;

  @Column(nullable = false)
  private Long wordCount;

  @Column(nullable = false)
  private String fileName;

  @Column(nullable = false)
  private String fileExtension;

  @OneToOne(mappedBy = "papersAttribute")
  private PapersEntity papers;
}
