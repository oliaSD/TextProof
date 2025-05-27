package org.olga.semernik.mailservice.controller;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class EmailRequest {

  private String email;
  private String username;
  private String activationCode;

}
