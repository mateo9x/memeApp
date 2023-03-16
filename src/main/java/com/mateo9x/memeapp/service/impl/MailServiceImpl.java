package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.AdditionalAppProperties;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.message.MailMessageSource;
import com.mateo9x.memeapp.service.MailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Slf4j
@Service
@AllArgsConstructor
public class MailServiceImpl implements MailService {

    private static final String RESET_PASSWORD_TITLE = "reset.password.title";
    private static final String RESET_PASSWORD_TEXT = "reset.password.text";

    private final JavaMailSender javaMailSender;
    private final AdditionalAppProperties additionalAppProperties;
    private final MailMessageSource messageSource;

    @Override
    public void sendResetPasswordEmail(UserDTO userDTO) {
        String url = additionalAppProperties.getAppFrontendUrl() + "/#/new-password?" + userDTO.getResetToken();
        String userFullName = userDTO.getFirstname() + " " + userDTO.getLastname();
        String text = messageSource.getMessage(RESET_PASSWORD_TEXT, userDTO.getLanguage());
        String textFormatted = MessageFormat.format(text, userFullName, url);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(additionalAppProperties.getAppDNS());
        message.setTo(userDTO.getEmail());
        message.setSubject(messageSource.getMessage(RESET_PASSWORD_TITLE, userDTO.getLanguage()));
        message.setText(textFormatted);
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Couldn't send reset password email: {}", e.getMessage());
        }
    }
}
