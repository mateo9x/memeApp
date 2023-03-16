package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.AdditionalAppProperties;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.message.MailMessageSource;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

@ExtendWith(MockitoExtension.class)
public class MailServiceImplTest {

    @Mock
    private JavaMailSender javaMailSender;

    @Mock
    private AdditionalAppProperties additionalAppProperties;

    @Mock
    private MailMessageSource messageSource;

    @InjectMocks
    private MailServiceImpl mailService;

    @Test
    public void shouldSendResetPasswordEmail() {
        //when
        UserDTO userDTO = new UserDTO();

        //given
        mailService.sendResetPasswordEmail(userDTO);

        //then
    }
}
