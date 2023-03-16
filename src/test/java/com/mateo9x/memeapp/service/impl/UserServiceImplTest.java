package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.entity.User;
import com.mateo9x.memeapp.mapper.UserMapper;
import com.mateo9x.memeapp.repository.UserRepository;
import com.mateo9x.memeapp.service.FileService;
import com.mateo9x.memeapp.service.MailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    @Mock
    private MailService mailService;

    @Mock
    private FileService fileService;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    public void shouldStartResetPasswordProcedureIfUserExists() {
        //given
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.of(new User()));

        //when
        userService.startResetPasswordProcedure(anyString());

        //then
        verify(mailService, times(1)).sendResetPasswordEmail(any());
        verify(userRepository, times(1)).save(any());
    }

    @Test
    public void shouldNotStartResetPasswordProcedureIfUserDoesntExists() {
        //given
        when(userRepository.findUserByEmail(anyString())).thenReturn(Optional.empty());

        //when
        userService.startResetPasswordProcedure(anyString());

        //then
        verify(mailService, never()).sendResetPasswordEmail(any());
        verify(userRepository, never()).save(any());
    }
}
