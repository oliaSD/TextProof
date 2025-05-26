package ru.semernik.olga.paperservice.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class SaverPDF {

  private final String storageDirectory = "uploads/pdf/";

  public void savePdfFromUrl(MultipartFile file, Long paperId) {
    try {

      Path uploadPath = Paths.get(storageDirectory);
      if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
      }

      String fileName = "document_" + paperId + ".pdf";
      Path filePath = uploadPath.resolve(fileName);

      try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {
        fos.write(file.getBytes());
      }

    } catch (IOException e) {
      log.info("Ошибка при сохранении PDF: " + e.getMessage());
    }
  }
}
