package ru.semernik.olga.paperservice.io.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Source {

  private String title;
  private String author;
  private String url;
  private double percentage;
}
