package ru.semernik.olga.paperservice.dao.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.semernik.olga.paperservice.dao.entity.PapersEntity;

@Repository
public interface PapersRepository extends JpaRepository<PapersEntity, Long> {

  Optional<PapersEntity> findByOwnerNameAndId(String ownerName, Long id);

  List<PapersEntity> findAllByOwnerName(String ownerName);

}
