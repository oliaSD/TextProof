package ru.semernik.olga.paperservice.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;
import ru.semernik.olga.paperservice.paper.dto.FileMetadata;
import ru.semernik.olga.paperservice.paper.dto.UploadPaperResponse;
import ru.semernik.olga.paperservice.service.common.PaperEntityService;
import ru.semernik.olga.paperservice.service.common.PapersParserService;

@Service
@RequiredArgsConstructor
public class UploadPaperService {

  private final PapersParserService papersParserService;
  private final PaperEntityService paperEntityService;

  public UploadPaperResponse upload(String username, MultipartFile paper) {

    PapersEntity paperEntity = papersParserService.parse(paper, username);
    paperEntityService.save(paperEntity);
    FileMetadata fileMetadata = new FileMetadata();
    fileMetadata.paperId(paperEntity.getId());
    fileMetadata.fileName(paperEntity.getPapersAttribute().getFileName());
    fileMetadata.fileExtension(paperEntity.getPapersAttribute().getFileExtension());
    fileMetadata.size(paperEntity.getPapersAttribute().getSize());
    fileMetadata.wordCount(paperEntity.getPapersAttribute().getWordCount());
    fileMetadata.createdDate(paperEntity.getPapersAttribute().getCreated().toString());

    return new UploadPaperResponse(username, fileMetadata);
  }
}
