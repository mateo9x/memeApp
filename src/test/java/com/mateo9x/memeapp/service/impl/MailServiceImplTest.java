package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.AdditionalAppProperties;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.message.MessageBundle;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MailServiceImplTest {

    @Mock
    private JavaMailSender javaMailSender;

    @Mock
    private AdditionalAppProperties additionalAppProperties;

    @Mock
    private MessageBundle messageBundle;

    @InjectMocks
    private MailServiceImpl mailService;

    @Test
    public void shouldSendResetPasswordEmail() {
        //when
        UserDTO userDTO = new UserDTO();
        when(messageBundle.getMessage(any(), any(), any())).thenReturn("");

        //given
        mailService.sendResetPasswordEmail(userDTO);

        //then
    }
}
