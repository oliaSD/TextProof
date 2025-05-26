package org.olga.semernik.groupservice.configuration.feign;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignClientConfiguration {

  @Bean
  public FeignClientInterceptor feignClientInterceptor() {
    return new FeignClientInterceptor();
  }
}