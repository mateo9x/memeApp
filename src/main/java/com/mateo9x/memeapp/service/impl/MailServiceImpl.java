package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.config.AdditionalAppProperties;
import com.mateo9x.memeapp.dto.UserDTO;
import com.mateo9x.memeapp.service.MailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final AdditionalAppProperties additionalAppProperties;

    @Override
    public void sendResetPasswordEmail(UserDTO userDTO) {
        String url = additionalAppProperties.getAppFrontendUrl() + "/#/new-password?" + userDTO.getResetToken();
        String userFullName = userDTO.getFirstname() + " " + userDTO.getLastname();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@memeapp.pl");
        message.setTo(userDTO.getEmail());
        message.setSubject("Meme App - Resetowanie hasła");
        message.setText("Witaj " + userFullName + "!\n\nPoniżej znajduje się link do zresetowania hasła:\n\n" + url);
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Nie udało się wysłać maila resetującego hasła: {}", e.getMessage());
        }
    }
}
