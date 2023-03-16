package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.model.AuthenticateRequest;
import com.mateo9x.memeapp.model.JWTToken;
import com.mateo9x.memeapp.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authenticate(@RequestBody @Valid AuthenticateRequest request) {
        log.info("REST request to authenticate user: {}", request.username());
        JWTToken jwtToken = authenticationService.authenticate(request);
        return ResponseEntity.ok(jwtToken);
    }
}
