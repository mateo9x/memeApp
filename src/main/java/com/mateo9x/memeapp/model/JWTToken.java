package com.mateo9x.memeapp.model;

import lombok.Value;

@Value(staticConstructor = "of")
public class JWTToken {
    String token;
}
