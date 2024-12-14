package ru.semernik.olga.paperservice.configuration.rest;

import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestClient;
import org.zalando.logbook.HttpRequest;
import org.zalando.logbook.Logbook;
import org.zalando.logbook.Strategy;
import org.zalando.logbook.httpclient5.LogbookHttpRequestInterceptor;
import org.zalando.logbook.httpclient5.LogbookHttpResponseInterceptor;

@Configuration(proxyBeanMethods = false)
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RestClientConfig {

  private final Logbook logbook;

  @Bean
  public RestClient webSearchRestClient(RestClient.Builder builder,
      WebSearchRestClientConfig webSearchRestClientConfig) {
    return builder
        .requestFactory(createRequestFactory(
            webSearchRestClientConfig.getReadTimeout(),
            webSearchRestClientConfig.getConnectTimeout()
        ))
        .build();
  }

//  @Bean
//  public ObjectMapper objectMapper() {
//    ObjectMapper objectMapper = new ObjectMapper();
//    objectMapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
//    return objectMapper;
//  }
//

  private ClientHttpRequestFactory createRequestFactory(int readTimeout, int connectTimeout) {
    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(
        createHttpClient());
    requestFactory.setConnectTimeout(connectTimeout);
    requestFactory.setConnectionRequestTimeout(readTimeout);
    return requestFactory;
  }

  private HttpClient createHttpClient() {
    return HttpClientBuilder.create()
        .setConnectionManager(createConnectionManager())
        .addRequestInterceptorFirst(new LogbookHttpRequestInterceptor(logbook))
        .addResponseInterceptorLast(new LogbookHttpResponseInterceptor())
        .build();
  }

  private HttpClientConnectionManager createConnectionManager() {
    return PoolingHttpClientConnectionManagerBuilder.create()
        .setMaxConnPerRoute(100)
        .setMaxConnTotal(100)
        .build();
  }
}