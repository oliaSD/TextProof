package ru.semernik.olga.paperservice.configuration;

import org.testcontainers.containers.PostgreSQLContainer;

public class PostgresContainer {

  private static PostgreSQLContainer<?> instance;

  public static synchronized PostgreSQLContainer<?> getInstance() {
    if (instance == null) {
      instance = startPostgreSqlContainer();
    }
    return instance;
  }

  private static PostgreSQLContainer<?> startPostgreSqlContainer() {
    PostgreSQLContainer<?> postgreSqlContainer = new PostgreSQLContainer<>("postgres:16.4");
    postgreSqlContainer.start();

    System.setProperty("spring.datasource.url",
        postgreSqlContainer.getJdbcUrl() + "?currentSchema=papers_schema");
    System.setProperty("spring.datasource.username", postgreSqlContainer.getUsername());
    System.setProperty("spring.datasource.password", postgreSqlContainer.getPassword());

    return postgreSqlContainer;
  }

}
