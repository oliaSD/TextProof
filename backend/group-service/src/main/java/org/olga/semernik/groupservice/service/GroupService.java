package org.olga.semernik.groupservice.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.olga.semernik.groupservice.dao.entities.Group;
import org.olga.semernik.groupservice.dao.entities.User;
import org.olga.semernik.groupservice.dao.repository.GroupRepository;
import org.olga.semernik.groupservice.dao.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.semernik.olga.groupservice.group.dto.CreateGroupRequest;
import ru.semernik.olga.groupservice.group.dto.InfoUserResponse;
import ru.semernik.olga.groupservice.group.dto.UserGroupResponse;

@Service
@RequiredArgsConstructor
public class GroupService {

  private final GroupRepository groupRepository;
  private final UserRepository userRepository;
  private final UserService userService;
  private final UserMailSenderService userMailSenderService;

  @Transactional
  public void createGroup(CreateGroupRequest createGroupRequest) {

    User admin = userService.getUserByUsername(createGroupRequest.getUsername());

    Group group = new Group();
    group.setName(createGroupRequest.getGroupName());

    group.setAdmin(admin);
    group.getMembers().add(admin);
    admin.getAdminGroups().add(group);
    admin.getGroups().add(group);

    groupRepository.save(group);
  }

  @Transactional(readOnly = true)
  public Group getGroupById(String groupId) {
    return groupRepository.findById(groupId)
        .orElseThrow(() -> new IllegalArgumentException("Group not found with id: " + groupId));
  }

  @Transactional
  public void addUserToGroup(String groupId, String userEmail) {
    Group group = getGroupById(groupId);
    User userToAdd = userService.getUserByUsername(userEmail);

    if (group.getMembers().contains(userToAdd)) {
      //log.info("User is already a member of this group");
      return;
    }

    group.getMembers().add(userToAdd);
    userToAdd.getGroups().add(group);

    groupRepository.save(group);
    userRepository.save(userToAdd);
  }

  public void notifyGroupMembers(String groupId, String requesterEmail) {
    var user = userService.getUserByEmail(requesterEmail);
    userMailSenderService.sendSimpleMail(requesterEmail, "Added member to group", groupId,
        user.getUsername());
  }

  @Transactional(readOnly = true)
  public List<User> getGroupMembers(String groupId) {
    Group group = getGroupById(groupId);
    return group.getMembers().stream().toList();
  }

  public List<UserGroupResponse> getUserGroups(String username) {
    return groupRepository.findAllGroupsByUserId(username).stream()
        .map(e -> new UserGroupResponse().type("Private").id(e.getId()).name(e.getName()).members(
            e.getMembers().stream().map(
                    user -> new InfoUserResponse().email(user.getEmail()).username(user.getUsername()))
                .collect(
                    Collectors.toList()))).toList();
  }

}