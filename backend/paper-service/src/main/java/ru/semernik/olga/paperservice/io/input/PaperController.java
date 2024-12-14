package ru.semernik.olga.paperservice.io.input;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.semernik.olga.paperservice.paper.PapersApi;
import ru.semernik.olga.paperservice.paper.dto.CheckPaperResponse;
import ru.semernik.olga.paperservice.paper.dto.GetPapersResponse;
import ru.semernik.olga.paperservice.paper.dto.StatusPaperResponse;
import ru.semernik.olga.paperservice.paper.dto.UploadPaperResponse;
import ru.semernik.olga.paperservice.service.CheckPaperService;
import ru.semernik.olga.paperservice.service.GetAllPaperService;
import ru.semernik.olga.paperservice.service.StatusPaperService;
import ru.semernik.olga.paperservice.service.UploadPaperService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaperController implements PapersApi {

  private final UploadPaperService uploadPaperService;
  private final GetAllPaperService getAllPaperService;
  private final CheckPaperService checkPaperService;
  private final StatusPaperService statusPaperService;

  @Override
  public ResponseEntity<CheckPaperResponse> check(Long paperId, String username) {
    return ResponseEntity.status(HttpStatus.OK).body(
        checkPaperService.check(paperId, username)
    );
  }

  @Override
  public ResponseEntity<Void> delete(String username, Long paperId) {
    return null;
  }

  @Override
  public ResponseEntity<GetPapersResponse> get(String username) {
    return ResponseEntity.status(HttpStatus.OK).body(
        getAllPaperService.getPapers(username)
    );
  }

  @Override
  public ResponseEntity<List<StatusPaperResponse>> getChecks(String username) {
    return ResponseEntity.status(HttpStatus.OK).body(statusPaperService.getAllPaperStatus(username));
  }

  @Override
  public ResponseEntity<StatusPaperResponse> status(String username, Long paperId) {
    return ResponseEntity.status(HttpStatus.OK).body(statusPaperService.getPaperStatus(username, paperId));
  }

  @Override
  public ResponseEntity<UploadPaperResponse> upload(String username, MultipartFile paper) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(uploadPaperService.upload(username, paper));
  }
}
