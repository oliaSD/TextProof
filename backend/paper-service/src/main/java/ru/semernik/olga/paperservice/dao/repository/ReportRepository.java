package ru.semernik.olga.paperservice.dao.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.semernik.olga.paperservice.dao.entity.ReportEntity;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

  Optional<ReportEntity> findByPapersId(Long paperId);

  List<ReportEntity> findAllByPapersOwnerName(String ownerName);
}
