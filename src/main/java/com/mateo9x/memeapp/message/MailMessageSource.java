package com.mateo9x.memeapp.message;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.ResourceBundle;

@Service
@AllArgsConstructor
public class MailMessageSource {

    private static final String MAIL_MESSAGE_PROPERTIES_PATH = "i18n/mail";

    public String getMessage(String messageKey, String language) {
        Locale locale = Locale.forLanguageTag(language);
        try {
            return (String) ResourceBundle.getBundle(MAIL_MESSAGE_PROPERTIES_PATH, locale).getObject(messageKey);
        } catch (Exception e) {
            return (String) ResourceBundle.getBundle(MAIL_MESSAGE_PROPERTIES_PATH, Locale.US).getObject(messageKey);
        }
    }
}
