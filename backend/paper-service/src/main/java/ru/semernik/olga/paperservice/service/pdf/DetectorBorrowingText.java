package ru.semernik.olga.paperservice.service.pdf;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.ru.RussianAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.FieldType;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexOptions;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.PostingsEnum;
import org.apache.lucene.index.Term;
import org.apache.lucene.index.TermsEnum;
import org.apache.lucene.search.similarities.ClassicSimilarity;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.apache.lucene.util.BytesRef;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import ru.semernik.olga.paperservice.io.output.google.dto.SearchResponse;
import ru.semernik.olga.paperservice.io.output.google.dto.SearchResponse.Result;
import ru.semernik.olga.paperservice.io.output.google.service.GoogleSearchService;
import ru.semernik.olga.paperservice.service.common.BorrowingText;
import ru.semernik.olga.paperservice.service.common.WebParserService;

@Service
@RequiredArgsConstructor
@Slf4j
public class DetectorBorrowingText {

  private Long maxCountResponse = 5L;

  private final GoogleSearchService googleSearchService;

  private final WebParserService webParserService;

  public BorrowingText isBorrowing(String paragraph) {
    var response = new SearchResponse();
    try {
      response = googleSearchService.search(paragraph);
    } catch (HttpClientErrorException e) {
      log.error( e.getMessage());
      return new BorrowingText(null, false, null);
    }

    if (response.getItems() == null || response.getItems().isEmpty()) {
      return new BorrowingText(null, false, null);
    }
    log.info("Get borrowing for {}", paragraph);
    Map<String, List<String>> responseMap = response.getItems().stream().limit(maxCountResponse)
        .map(
            Result::getLink).collect(Collectors.toMap(link -> link, webParserService::parse));
    for (var entrySet : responseMap.entrySet()) {
      for (var text : entrySet.getValue()) {
        {
          if (text == null) {
            break;
          }
          try {
            var result = calculateCosineSimilarity(paragraph, text);
            System.out.println(result);
            if (result > 0.399f) {
              return new BorrowingText(entrySet.getKey(), true, paragraph);
            }
          } catch (IOException e) {
            throw new RuntimeException(e);
          }
        }
      }
    }
    return new BorrowingText(null, false, null);
  }

  public float calculateCosineSimilarity(String originalText, String webText) throws IOException {
    // Создание индекса в памяти
    Directory directory = new RAMDirectory();

    // Использование анализатора для русского языка
    Analyzer analyzer = new RussianAnalyzer();
    IndexWriterConfig config = new IndexWriterConfig(analyzer);
    IndexWriter writer = new IndexWriter(directory, config);

    // Индексация документов
    indexDocument(writer, originalText);
    indexDocument(writer, webText);

    // Закрытие writer для завершения индексирования
    writer.close();

    // Чтение индекса
    IndexReader reader = DirectoryReader.open(directory);

    // Экстракция TF-IDF векторов
    Map<String, Float> vector1 = extractTFIDFVector(reader, 0);
    Map<String, Float> vector2 = extractTFIDFVector(reader, 1);

    // Закрытие reader
    reader.close();

    // Вычисление и возврат косинусного сходства
    return cosineSimilarity(vector1, vector2);
  }

  private void indexDocument(IndexWriter writer, String text) throws IOException {
    Document doc = new Document();
    FieldType fieldType = new FieldType();
    fieldType.setIndexOptions(IndexOptions.DOCS_AND_FREQS_AND_POSITIONS);
    fieldType.setStoreTermVectors(true);
    fieldType.setTokenized(true);
    doc.add(new Field("content", text, fieldType));
    writer.addDocument(doc);
  }

  private Map<String, Float> extractTFIDFVector(IndexReader reader, int docId) throws IOException {
    Map<String, Float> tfidfVector = new HashMap<>();
    ClassicSimilarity similarity = new ClassicSimilarity();

    var terms = reader.getTermVector(docId, "content");
    // Получение термов и их TF-IDF
    if (terms != null) {
      TermsEnum termsEnum = terms.iterator();
      BytesRef term;
      while ((term = termsEnum.next()) != null) {
        String termText = term.utf8ToString();
        PostingsEnum postings = termsEnum.postings(null, PostingsEnum.FREQS);

        if (postings.nextDoc() != PostingsEnum.NO_MORE_DOCS) {
          int freq = postings.freq();
          float tf = similarity.tf(freq);
          float idf = similarity.idf(reader.docFreq(new Term("content", termText)),
              reader.maxDoc());
          tfidfVector.put(termText, tf * idf);
        }
      }
    } else {
      System.out.println("No terms found for document ID " + docId);
    }
    return tfidfVector;
  }

  private float cosineSimilarity(Map<String, Float> vector1, Map<String, Float> vector2) {
    float dotProduct = 0.0f;
    float normA = 0.0f;
    float normB = 0.0f;

    for (String key : vector1.keySet()) {
      dotProduct += vector1.getOrDefault(key, 0.0f) * vector2.getOrDefault(key, 0.0f);
      normA += Math.pow(vector1.getOrDefault(key, 0.0f), 2);
    }

    for (String key : vector2.keySet()) {
      normB += Math.pow(vector2.getOrDefault(key, 0.0f), 2);
    }

    return dotProduct / (float) (Math.sqrt(normA) * Math.sqrt(normB));
  }

}
