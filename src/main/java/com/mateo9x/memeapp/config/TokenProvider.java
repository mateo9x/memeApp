package com.mateo9x.memeapp.config;

import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.exception.AuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.security.Key;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;

@Configuration
@Slf4j
public class TokenProvider {

    private static final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Value("${jwt.validity.time}")
    private long tokenValidity;

    @Value("${jwt.validity.rememberMe.time}")
    private long tokenValidityRememberMe;

    public String createToken(UserDTO userDTO, Boolean rememberMe) {

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime expirationDateTime = now.plus(rememberMe ? this.tokenValidityRememberMe : this.tokenValidity, ChronoUnit.MILLIS);

        Date issueDate = Date.from(now.toInstant());
        Date expirationDate = Date.from(expirationDateTime.toInstant());

        return Jwts.builder()
                .setSubject(userDTO.getUsername())
                .signWith(KEY)
                .setIssuer("ISSUER")
                .setIssuedAt(issueDate)
                .setExpiration(expirationDate)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token).getBody();

        return new UsernamePasswordAuthenticationToken(claims.getSubject(), "", Collections.emptyList());
    }

    public Jws<Claims> validateToken(String authToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(KEY)
                    .requireIssuer("ISSUER")
                    .build()
                    .parseClaimsJws(authToken);
        } catch (Exception e) {
            log.info("Invalid JWT signature: " + e.getMessage());
            throw new AuthenticationException(e.getMessage());
        }
    }
}
