package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.model.AuthenticateRequest;
import com.mateo9x.memeapp.model.JWTToken;

public interface AuthenticationService {

    JWTToken authenticate(AuthenticateRequest request);
}
