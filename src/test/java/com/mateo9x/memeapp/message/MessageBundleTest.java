package com.mateo9x.memeapp.message;

import com.mateo9x.memeapp.dto.UserDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class MessageBundleTest {

    private static final String LANG = "pl";
    private static final String BUNDLE_NOT_EXISTING = "bundle";
    private static final String BUNDLE_RESET_PASSWORD = "reset.password.title";

    @InjectMocks
    private MessageBundle messageBundle;

    @Test
    public void shouldReturnNullWhenBundleDoesntExists() {
        //given
        UserDTO userDTO = prepareUserDTO();
        //when
        String message = messageBundle.getMessage(BUNDLE_NOT_EXISTING, userDTO.getLanguage(), MessageBundle.Type.MAIL);

        //then
        Assertions.assertNull(message);
    }

    @Test
    public void shouldReturnMessageWhenBundleExists() {
        //given
        UserDTO userDTO = prepareUserDTO();
        //when
        String message = messageBundle.getMessage(BUNDLE_RESET_PASSWORD, userDTO.getLanguage(), MessageBundle.Type.MAIL);

        //then
        Assertions.assertNotNull(message);
    }

    private UserDTO prepareUserDTO() {
        UserDTO userDTO = new UserDTO();
        userDTO.setLanguage(LANG);
        return userDTO;
    }
}
