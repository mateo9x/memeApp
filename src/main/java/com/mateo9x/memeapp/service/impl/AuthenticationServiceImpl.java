package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.TokenProvider;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.exception.AuthenticationException;
import com.mateo9x.memeapp.model.AuthenticateRequest;
import com.mateo9x.memeapp.model.JWTToken;
import com.mateo9x.memeapp.service.AuthenticationService;
import com.mateo9x.memeapp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;
    private final TokenProvider tokenProvider;

    @Override
    public JWTToken authenticate(AuthenticateRequest request) {
        AtomicReference<JWTToken> jwtToken = new AtomicReference<>();
        Optional<UserDTO> userDTOOptional = userService.getUserByUsername(request.getUsername());
        userDTOOptional.ifPresent(userDTO -> jwtToken.set(authenticateUser(userDTO, request)));
        if (jwtToken.get() != null) {
            return jwtToken.get();
        }
        throw new AuthenticationException("User not found");
    }

    private JWTToken authenticateUser(UserDTO userDTO, AuthenticateRequest request) {
        if (userService.doesBothPasswordsMatches(userDTO.getPassword(), request.getPassword())) {
            return JWTToken.of(tokenProvider.createToken(userDTO, request.getRememberMe()));
        }
        throw new AuthenticationException("Incorrect password");
    }
}
