package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.UserDTO;

public interface MailService {

    void sendResetPasswordEmail(UserDTO userDTO);
    void sendWelcomeNewUserEmail(UserDTO userDTO);
}
