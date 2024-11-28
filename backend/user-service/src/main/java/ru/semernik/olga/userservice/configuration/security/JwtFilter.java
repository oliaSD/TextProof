package ru.semernik.olga.userservice.configuration.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

@Service
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

  private final JwtTokenProvider jwtTokenProvider;

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
      FilterChain filterChain) throws IOException, ServletException {
    String token = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);
    if (token != null && jwtTokenProvider.validateToken(token)) {
      Authentication auth = jwtTokenProvider.getAuthentication(token);
      if (auth != null) {
        SecurityContextHolder.getContext().setAuthentication(auth);
      }
    }
    filterChain.doFilter(servletRequest, servletResponse);
  }
}
