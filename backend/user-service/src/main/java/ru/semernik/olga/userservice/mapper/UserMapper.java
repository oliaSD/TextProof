package ru.semernik.olga.userservice.mapper;

import lombok.experimental.UtilityClass;
import ru.semernik.olga.userservice.dao.entity.UserActiveStatus;
import ru.semernik.olga.userservice.dao.entity.UserEntity;
import ru.semernik.olga.userservice.dao.entity.UserRole;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse.StatusEnum;
import ru.semernik.olga.userservice.user.dto.InfoUserResponse.UserRoleEnum;

@UtilityClass
public class UserMapper {

  public static InfoUserResponse toInfoUserResponse(UserEntity userEntity) {
    if (userEntity == null) {
      return null;
    }

    InfoUserResponse response = new InfoUserResponse();
    response.setUsername(userEntity.getUsername());
    response.setEmail(userEntity.getEmail());
    response.setUserRole(mapRoleToType(userEntity.getRole()));
    response.setStatus(mapRoleToType(userEntity.getAccountStatus()));
    return response;
  }

  private static StatusEnum mapRoleToType(UserActiveStatus userActiveStatus) {
    return StatusEnum.fromValue(userActiveStatus.name());
  }

  private static UserRoleEnum mapRoleToType(UserRole role) {
    if (role == null) {
      return UserRoleEnum.USER;
    }

    return switch (role) {
      case ROLE_ADMIN -> UserRoleEnum.ADMIN;
      case ROLE_USER -> UserRoleEnum.USER;
    };
  }

  public static UserActiveStatus toUserActiveStatus(Boolean isSetBlocking) {
    if (!isSetBlocking) {
      return UserActiveStatus.ACTIVE;
    }
    return UserActiveStatus.NOACTIVE;
  }
}