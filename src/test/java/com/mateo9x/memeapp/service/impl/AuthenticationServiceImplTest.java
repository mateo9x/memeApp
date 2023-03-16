package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.TokenProvider;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.exception.AuthenticationException;
import com.mateo9x.memeapp.model.AuthenticateRequest;
import com.mateo9x.memeapp.model.JWTToken;
import com.mateo9x.memeapp.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static java.lang.Boolean.TRUE;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceImplTest {

    private static final String USERNAME = "USERNAME";
    private static final String PASSWORD = "PASSWORD";
    private static final Long USER_ID = 1L;
    private static final String TOKEN = "TOKEN";

    @Mock
    private UserService userService;

    @Mock
    private TokenProvider tokenProvider;

    @InjectMocks
    private AuthenticationServiceImpl service;

    @Test
    public void shouldAuthenticateUserIfUserExistsAndPasswordMatches() {
        //given
        UserDTO userDTO = prepareUser();
        when(userService.getUserByUsername(USERNAME)).thenReturn(Optional.of(userDTO));
        when(userService.doesBothPasswordsMatches(userDTO.getPassword(), PASSWORD)).thenReturn(true);
        when(tokenProvider.createToken(userDTO, TRUE)).thenReturn(TOKEN);
        //when
        JWTToken token = service.authenticate(prepareRequest());

        //then
        Assertions.assertEquals(token.getToken(), TOKEN);
    }

    @Test
    public void shouldNotAuthenticateUserIfUserExistsAndPasswordDoesntMatch() {
        //given
        UserDTO userDTO = prepareUser();
        when(userService.getUserByUsername(USERNAME)).thenReturn(Optional.of(userDTO));
        when(userService.doesBothPasswordsMatches(userDTO.getPassword(), PASSWORD)).thenReturn(false);
        //when
        Throwable throwable = catchThrowable(() -> service.authenticate(prepareRequest()));

        //then
        Assertions.assertInstanceOf(AuthenticationException.class, throwable);
    }

    @Test
    public void shouldNotAuthenticateUserIfUserDoesntExist() {
        //given
        UserDTO userDTO = prepareUser();
        when(userService.getUserByUsername(USERNAME)).thenReturn(Optional.empty());
        //when
        Throwable throwable = catchThrowable(() -> service.authenticate(prepareRequest()));

        //then
        Assertions.assertInstanceOf(AuthenticationException.class, throwable);
    }

    private AuthenticateRequest prepareRequest() {
        return new AuthenticateRequest(USERNAME, PASSWORD, TRUE);
    }

    private UserDTO prepareUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(USER_ID);
        return userDTO;
    }
}
