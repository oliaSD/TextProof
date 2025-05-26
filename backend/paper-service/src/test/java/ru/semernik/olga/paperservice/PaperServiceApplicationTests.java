package ru.semernik.olga.paperservice;

import org.junit.Rule;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.containers.PostgreSQLContainer;
import ru.semernik.olga.paperservice.configuration.PostgresContainer;

@SpringBootTest
@Disabled
class PaperServiceApplicationTests {

  @Rule
  public PostgreSQLContainer<?> postgreSQLContainer = PostgresContainer.getInstance();

  @Test
  @Disabled
  void contextLoads() {
  }

}
