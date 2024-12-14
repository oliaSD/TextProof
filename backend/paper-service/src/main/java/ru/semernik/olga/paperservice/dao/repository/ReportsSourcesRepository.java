package ru.semernik.olga.paperservice.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.semernik.olga.paperservice.dao.entity.ReportsSources;

@Repository
public interface ReportsSourcesRepository extends JpaRepository<ReportsSources, Long> {

}
