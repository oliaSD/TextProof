package ru.semernik.olga.userservice.dao.entity;

public enum UserActiveStatus {
  ACTIVE("ACTIVE"), NOACTIVE("NO_ACTIVE");

  private final String statusName;

  UserActiveStatus(String status) {
    statusName = status;
  }
}
