package ru.semernik.olga.userservice.dao.repository;

import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.semernik.olga.userservice.dao.entity.UserActiveStatus;
import ru.semernik.olga.userservice.dao.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

  Optional<UserEntity> findByUsername(String username);

  Optional<UserEntity> findByEmail(String email);

  Optional<UserEntity> findByActivateCode(String activateCode);

  @Modifying
  @Transactional
  @Query("UPDATE UserEntity u SET u.accountStatus = :status WHERE u.username = :username")
  void updateUserStatus(@Param("username") String username,
      @Param("status") UserActiveStatus status);
}
