package org.olga.semernik.groupservice.dao.repository;

import java.util.Optional;
import org.olga.semernik.groupservice.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);

  Optional<User>  findByUsername(String username);
}
