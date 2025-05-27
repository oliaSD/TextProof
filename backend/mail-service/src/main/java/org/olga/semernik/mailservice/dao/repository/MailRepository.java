package org.olga.semernik.mailservice.dao.repository;

import org.olga.semernik.mailservice.dao.entity.MailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MailRepository extends JpaRepository<MailEntity, Long> {

}
