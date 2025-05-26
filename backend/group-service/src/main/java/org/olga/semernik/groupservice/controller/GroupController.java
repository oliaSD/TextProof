package org.olga.semernik.groupservice.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.olga.semernik.groupservice.service.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ru.semernik.olga.groupservice.group.GroupsApi;
import ru.semernik.olga.groupservice.group.dto.CreateGroupRequest;
import ru.semernik.olga.groupservice.group.dto.SuccessResponse;
import ru.semernik.olga.groupservice.group.dto.UserGroupResponse;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController implements GroupsApi {

  private final GroupService groupService;

  @Override
  public ResponseEntity<SuccessResponse> addUser(String groupId,
      String email) {
    groupService.addUserToGroup(groupId, email);
    return ResponseEntity.ok(new SuccessResponse());
  }

  @Override
  public ResponseEntity<SuccessResponse> create(CreateGroupRequest createGroupRequest) {
    groupService.createGroup(createGroupRequest);
    return ResponseEntity.ok(new SuccessResponse());
  }

  @Override
  public ResponseEntity<List<UserGroupResponse>> getUsersGroups(String username) {
    return ResponseEntity.ok(groupService.getUserGroups(username));
  }

  @Override
  public ResponseEntity<SuccessResponse> notifyUser(String groupId, String email) {
    groupService.notifyGroupMembers(groupId, email);
    return ResponseEntity.ok(new SuccessResponse());
  }
}
