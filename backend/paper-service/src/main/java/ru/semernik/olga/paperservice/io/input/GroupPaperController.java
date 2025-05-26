package ru.semernik.olga.paperservice.io.input;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.semernik.olga.paperservice.paper.PapersApi;
import ru.semernik.olga.paperservice.paper.PapersGroupApi;
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
public class GroupPaperController implements PapersGroupApi {

  private final UploadPaperService uploadPaperService;
  private final GetAllPaperService getAllPaperService;
  private final CheckPaperService checkPaperService;
  private final StatusPaperService statusPaperService;

  @Override
  public ResponseEntity<CheckPaperResponse> checkGroup(Long paperId, String groupId) {
    return ResponseEntity.status(HttpStatus.OK).body(
        checkPaperService.check(paperId, groupId)
    );
  }

  @Override
  public ResponseEntity<Void> deleteGroup(String groupId, Long paperId) {
    return null;
  }

  @Override
  public ResponseEntity<GetPapersResponse> getGroup(String groupId) {
    return ResponseEntity.status(HttpStatus.OK).body(
        getAllPaperService.getPapers(groupId)
    );
  }

  @Override
  public ResponseEntity<List<StatusPaperResponse>> getChecksGroup(String groupId) {
    return ResponseEntity.status(HttpStatus.OK).body(statusPaperService.getAllPaperStatus(groupId));
  }

  @Override
  public ResponseEntity<StatusPaperResponse> statusGroup(String groupId, Long paperId) {
    return ResponseEntity.status(HttpStatus.OK).body(statusPaperService.getPaperStatus(groupId, paperId));
  }

  @Override
  public ResponseEntity<UploadPaperResponse> uploadGroup(String groupId, MultipartFile paper) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(uploadPaperService.upload(groupId, paper));
  }
}
