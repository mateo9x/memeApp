package com.mateo9x.memeapp.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record AuthenticateRequest(@NotBlank String username, @NotBlank String password, @NotNull Boolean rememberMe) {

}
