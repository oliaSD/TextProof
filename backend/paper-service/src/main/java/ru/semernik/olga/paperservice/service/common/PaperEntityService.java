package ru.semernik.olga.paperservice.service.common;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;
import ru.semernik.olga.paperservice.dao.repository.PapersRepository;
import ru.semernik.olga.paperservice.exception.BasePaperException;

@Service
@RequiredArgsConstructor
public class PaperEntityService {

  private final PapersRepository papersRepository;

  public PapersEntity save(PapersEntity papersEntity) {
    return papersRepository.save(papersEntity);
  }

  public List<PapersEntity> findAllByUsername(String username) {
    return papersRepository.findAllByUsername(username);
  }

  public PapersEntity findById(Long id) {
    return papersRepository.findById(id).orElseThrow(()-> new BasePaperException(HttpStatus.BAD_REQUEST, "Papers not found"));
  }
}
