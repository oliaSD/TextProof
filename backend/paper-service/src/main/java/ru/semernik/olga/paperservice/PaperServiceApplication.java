package ru.semernik.olga.paperservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import ru.semernik.olga.paperservice.configuration.rest.DefaultRestClientConfig;
import ru.semernik.olga.paperservice.configuration.rest.WebSearchRestClientConfig;

@SpringBootApplication
@ConfigurationPropertiesScan(
    basePackageClasses = {
        WebSearchRestClientConfig.class,
        DefaultRestClientConfig.class
    }
)
public class PaperServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(PaperServiceApplication.class, args);
  }

}
