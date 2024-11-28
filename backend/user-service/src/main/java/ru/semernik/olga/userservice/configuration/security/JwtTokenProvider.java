package ru.semernik.olga.userservice.configuration.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

  @Value("${jwt.token.secret}")
  private String secret;

  @Value("${jwt.token.expired}")
  private Long expired;

  private SecretKey secretKey;

  private final UserDetailsService userDetailsService;

  @PostConstruct
  protected void init() {
    secret = Base64.getEncoder().encodeToString(secret.getBytes());
    secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
  }

  public String generateToken(UserDetails userDetails) {
    HashMap<String, Object> claims = new HashMap<>();
    claims.put("user", userDetails.getUsername());
    claims.put("roles", userDetails.getAuthorities());
    Instant now = Instant.now();
    Instant validUntil = now.plusSeconds(expired);
    return Jwts.builder()
        .subject(userDetails.getUsername())
        .claims(claims)
        .issuedAt(Date.from(now))
        .expiration(Date.from(validUntil))
        .signWith(secretKey, SIG.HS256)
        .compact();
  }

  public Authentication getAuthentication(String token) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(getUsername(token));
    return new UsernamePasswordAuthenticationToken(userDetails, "",
        userDetails.getAuthorities());
  }

  public String getUsername(String token) {
    return Jwts.parser()
        .decryptWith(secretKey).
        build()
        .parseSignedClaims(token)
        .getPayload()
        .getSubject();
  }

  public String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

  public boolean validateToken(String token) {
    try {
      Jws<Claims> claims = Jwts.parser().decryptWith(secretKey).build().parseSignedClaims(token);
      return !claims.getPayload().getExpiration().before(new Date());
    } catch (JwtException e) {
      throw new BadCredentialsException("JWT token is expired or invalid");
    }
  }
}
