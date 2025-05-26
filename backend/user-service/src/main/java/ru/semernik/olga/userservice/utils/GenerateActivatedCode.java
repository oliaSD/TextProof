package ru.semernik.olga.userservice.utils;

import java.time.Instant;
import lombok.experimental.UtilityClass;

@UtilityClass
public class GenerateActivatedCode {

  public synchronized String generateActivatedCode() {
    return ((Long) Instant.now().getEpochSecond()).toString();
  }
}
