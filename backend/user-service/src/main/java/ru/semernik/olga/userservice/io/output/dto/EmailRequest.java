package ru.semernik.olga.userservice.io.output.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailRequest {

  private String email;
  private String username;
  private String activationCode;

}
