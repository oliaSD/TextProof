//package org.olga.semernik.groupservice.dao.repository;
//
//
//import org.olga.semernik.groupservice.dao.entities.Group;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface GroupMembershipRepository extends JpaRepository<Group, Long> {
//
//  @Modifying
//  @Query(value = "INSERT INTO group_members (groups_id, username) VALUES (:groupId, :username)", nativeQuery = true)
//  void addUserToGroup(@Param("groupId") Long groupId, @Param("userId") Long userId);
//
//  @Modifying
//  @Query(value = "DELETE FROM group_members WHERE groups_id = :groupId AND user_id = :userId", nativeQuery = true)
//  void removeUserFromGroup(@Param("groupId") Long groupId, @Param("userId") Long userId);
//
//  @Modifying
//  @Query(value = "INSERT INTO group_admin (group_id, user_id) VALUES (:groupId, :userId)", nativeQuery = true)
//  void addAdminToGroup(@Param("groupId") Long groupId, @Param("userId") Long userId);
//
//  @Modifying
//  @Query(value = "DELETE FROM group_admins WHERE group_id = :groupId AND user_id = :userId", nativeQuery = true)
//  void removeAdminFromGroup(@Param("groupId") Long groupId, @Param("userId") Long userId);
//}