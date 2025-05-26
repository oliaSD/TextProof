package org.olga.semernik.groupservice.dao.repository;


import org.olga.semernik.groupservice.dao.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, String> {

  Optional<Group> findByName(String name);

  List<Group> findByMembersEmail(String email);

  @Query("SELECT g FROM Group g JOIN g.members m WHERE m.username = :username")
  List<Group> findAllGroupsByUserId(@Param("username") String username);

  @Query("SELECT g FROM Group g JOIN g.admin a WHERE a.username = :username")
  List<Group> findAllAdminGroupsByUserId(@Param("username") String username);

  @Query("SELECT COUNT(g) > 0 FROM Group g JOIN g.admin a WHERE g.id = :groupId AND a.username = :username")
  boolean isUserAdminOfGroup(@Param("username") String username, @Param("groupId") Long groupId);

  @Query("SELECT COUNT(g) > 0 FROM Group g JOIN g.members m WHERE g.id = :groupId AND m.username = :username")
  boolean isUserMemberOfGroup(@Param("username") String username, @Param("groupId") Long groupId);

}