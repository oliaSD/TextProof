package ru.semernik.olga.userservice.dao.entity;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {

  ROLE_USER("ROLE_USER"),
  ROLE_ADMIN("ROLE_ADMIN");
  private final String authority;

  UserRole(String authority) {
    this.authority = authority;
  }

  @Override
  public String getAuthority() {
    return authority;
  }
}
