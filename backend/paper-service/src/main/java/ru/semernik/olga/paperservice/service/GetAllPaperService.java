package ru.semernik.olga.paperservice.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;
import ru.semernik.olga.paperservice.paper.dto.FileMetadata;
import ru.semernik.olga.paperservice.paper.dto.GetPapersResponse;
import ru.semernik.olga.paperservice.service.common.PaperEntityService;

@Service
@RequiredArgsConstructor
public class GetAllPaperService {

  private final PaperEntityService paperEntityService;

  public List<GetPapersResponse> getAll(String username) {
    return null;
  }

  public GetPapersResponse getPapers(String username) {
    List<PapersEntity> papers = paperEntityService.findAllByUsername(username);
    GetPapersResponse response = new GetPapersResponse();
    response.setPapers(
        papers.stream().map(paperEntity -> {
          FileMetadata fileMetadata = new FileMetadata();
          fileMetadata.paperId(paperEntity.getId());
          fileMetadata.fileName(paperEntity.getPapersAttribute().getFileName());
          fileMetadata.fileExtension(paperEntity.getPapersAttribute().getFileExtension());
          fileMetadata.size(paperEntity.getPapersAttribute().getSize());
          fileMetadata.wordCount(paperEntity.getPapersAttribute().getWordCount());
          fileMetadata.createdDate(paperEntity.getPapersAttribute().getCreated().toString());
          return fileMetadata;
        }).toList());
    return response;
  }
}
