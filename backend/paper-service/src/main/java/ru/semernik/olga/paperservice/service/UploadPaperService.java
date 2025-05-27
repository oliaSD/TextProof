package ru.semernik.olga.paperservice.service;


import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
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
  private final SaverPDF saverPDF;

  public UploadPaperResponse upload(String username, MultipartFile paper) {

    return getUploadPaperResponse(username, paper, false);
  }

  @NotNull
  private UploadPaperResponse getUploadPaperResponse(String username, MultipartFile paper,
      boolean isPublic) {
    PapersEntity paperEntity = papersParserService.parse(paper, username, isPublic);
    paperEntityService.save(paperEntity);
    FileMetadata fileMetadata = new FileMetadata();
    fileMetadata.paperId(paperEntity.getId());
    fileMetadata.fileName(paperEntity.getPapersAttribute().getFileName());
    fileMetadata.fileExtension(".pdf");
    fileMetadata.size(paperEntity.getPapersAttribute().getSize());
    fileMetadata.wordCount(paperEntity.getPapersAttribute().getWordCount());
    fileMetadata.createdDate(paperEntity.getPapersAttribute().getCreated().toString());

    saverPDF.savePdfFromUrl(paper, paperEntity.getId());
    return new UploadPaperResponse(username, fileMetadata);
  }

  public UploadPaperResponse uploadGroup(String username, MultipartFile paper) {

    return getUploadPaperResponse(username, paper, true);
  }
}
