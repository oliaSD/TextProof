package org.olga.semernik.groupservice.configuration.feign;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String TOKEN_TYPE = "Bearer ";

  @Override
  public void apply(RequestTemplate template) {
    ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    if (requestAttributes != null) {
      String authorizationHeader = requestAttributes.getRequest().getHeader(AUTHORIZATION_HEADER);
      if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_TYPE)) {
        template.header(AUTHORIZATION_HEADER, authorizationHeader);
      }
    }
  }
}