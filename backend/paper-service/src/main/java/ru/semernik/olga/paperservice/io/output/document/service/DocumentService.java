package ru.semernik.olga.paperservice.io.output.document.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.semernik.olga.paperservice.io.output.document.client.DocumentClient;

@Service
@RequiredArgsConstructor
public class DocumentService {

  private final DocumentClient documentClient;

  public String getFullText(MultipartFile file) {
    return documentClient.getFullText(file);
  }
}
