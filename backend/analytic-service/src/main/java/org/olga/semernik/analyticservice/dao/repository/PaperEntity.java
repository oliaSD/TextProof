package org.olga.semernik.analyticservice.dao.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class PaperEntity {

  @Id
  private Long id;

}
