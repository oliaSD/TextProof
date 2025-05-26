package ru.semernik.olga.paperservice.io.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FileMetadata {

  private String fileName;
  private String createdDate;
  private int size;
  private int wordCount;
  private int pageCount;
  private int sentenceCount;
}
