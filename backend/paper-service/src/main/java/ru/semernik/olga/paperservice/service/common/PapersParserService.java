package ru.semernik.olga.paperservice.service.common;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;
import ru.semernik.olga.paperservice.dao.entity.PapersAttributeEntity;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;
import ru.semernik.olga.paperservice.dao.entity.PapersTextEntity;
import ru.semernik.olga.paperservice.exception.CreateFileException;
import ru.semernik.olga.paperservice.service.pdf.TextTokenExtractor;

@Service
@RequiredArgsConstructor
@Slf4j
public class PapersParserService {

  public PapersEntity parse(MultipartFile paper, String username, boolean isPublic) {

    try (InputStream stream = paper.getInputStream()) {

      Parser parser = new AutoDetectParser();
      BodyContentHandler handler = new BodyContentHandler();
      Metadata metadata = new Metadata();
      parser.parse(stream, handler, metadata, new ParseContext());

      PapersEntity papers = new PapersEntity();
      List<PapersTextEntity> paragraphs = splitIntoParagraphsStream(handler.toString())
          .map(paragraph ->
              PapersTextEntity.builder()
                  .text(paragraph)
                  .size((long) paragraph.length())
                  .hash(String.valueOf(paragraph.hashCode()))
                  .papers(papers)
                  .build()
          ).toList();

      var offset = 0L;
      var symbols = 0L;
      for (var elem : paragraphs) {
        elem.setTextOffset(offset);
        offset += TextTokenExtractor.countWord(elem.getText());
        symbols += elem.getText().length();
      }
      PapersAttributeEntity attributeEntity = PapersAttributeEntity.builder()
          .authors(username)
          .fileExtension(paper.getContentType())
          .fileName(paper.getOriginalFilename())
          .isShare(false)
          .isSource(false)
          .papers(papers)
          .wordCount(offset)
          .size(symbols)
          .hash(String.valueOf(paragraphs.hashCode()))
          .created(LocalDateTime.now(ZoneOffset.UTC))
          .build();
      papers.setPapersTexts(paragraphs);
      papers.setType("document");
      papers.setPublic(isPublic);
      papers.setPapersAttribute(attributeEntity);
      papers.setUsername(username);
      papers.setType(papers.getType());
      return papers;
    } catch (IOException | SAXException | TikaException e) {
      throw new CreateFileException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }

  private Stream<String> splitIntoParagraphsStream(String text) {
    if (text == null || text.isEmpty()) {
      return Stream.of();
    }
    Pattern paragraphPattern = Pattern.compile(
        "((?<=\\s)\\r?\\n(?=\\s))|((\\r?\\n\\s*){2,})|[\\u2028\\u2029]");

    return Arrays.stream(paragraphPattern.split(text))
        .map(String::trim)
        .filter(paragraph -> !paragraph.isEmpty())
        .map(paragraph -> paragraph.replaceAll("\n", " ")
            .replaceAll("\r", " ")
            .replaceAll("  ", " ")
        );
  }
}
