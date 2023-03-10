package com.mateo9x.memeapp.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Value;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Value
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthenticateRequest {

    @NotBlank
    String username;
    @NotBlank
    String password;
    @NotNull
    Boolean rememberMe;
}
