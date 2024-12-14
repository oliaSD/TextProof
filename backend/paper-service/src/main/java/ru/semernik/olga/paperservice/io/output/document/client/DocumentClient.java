package ru.semernik.olga.paperservice.io.output.document.client;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import ru.semernik.olga.paperservice.configuration.document.DocumentConfig;

@Component
@RequiredArgsConstructor
public class DocumentClient {

  private final RestTemplate restTemplate = new RestTemplate();
  private final DocumentConfig documentConfig;


  public String getFullText(MultipartFile file) {
    // Настройка заголовков запроса
    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    try {
      body.add("input", file.getInputStream());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    // Создание запроса с телом
    HttpEntity<?> requestEntity = new HttpEntity<>(body, headers);

    // Выполнение POST запроса и получение ответа как массива байтов
    ResponseEntity<byte[]> response = restTemplate.exchange(
        documentConfig.getFullText(),
        HttpMethod.POST,
        requestEntity,
        byte[].class);

    // Проверка статуса ответа и сохранение файла
    if (response.getStatusCode() == HttpStatus.OK) {
      byte[] fileBytes = response.getBody();
      if (fileBytes != null) {
        try (FileOutputStream fos = new FileOutputStream(file.getName().toLowerCase())) {
          fos.write(fileBytes);
          System.out.println("File downloaded successfully: " + file);
        } catch (IOException e) {
          System.err.println("Failed to save file: " + e.getMessage());
        }
      }
    } else {
      System.err.println("Failed to download file, HTTP status: " + response.getStatusCode());
    }
    return null;
  }
}

@Getter
@Setter
@AllArgsConstructor
class Request {
  private MultipartFile input;
}
