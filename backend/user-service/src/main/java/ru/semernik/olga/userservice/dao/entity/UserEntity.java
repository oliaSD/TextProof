package ru.semernik.olga.userservice.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", indexes = {@Index(name = "idx_activate_code", columnList = "activate_code"),
    @Index(name = "idx_email", columnList = "email"),
    @Index(name = "idx_username", columnList = "username")})
public class UserEntity implements UserDetails {

  @Column(unique = true, nullable = false)
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  @Getter
  private String email;

  @Column(nullable = false)
  @Getter
  @Setter
  @Enumerated(EnumType.STRING)
  private UserActiveStatus accountStatus;

  @Column(name = "activate_code")
  @Getter
  private String activateCode;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Getter
  private UserRole role;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(this.role);
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }
}
