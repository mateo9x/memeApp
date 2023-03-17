package com.mateo9x.memeapp.message;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.ResourceBundle;

@Service
@Slf4j
@AllArgsConstructor
public class MessageBundle {

    public String getMessage(String messageKey, String language, MessageSourceType messageSourceType) {
        Locale locale = Locale.forLanguageTag(language);
        try {
            return (String) ResourceBundle.getBundle(messageSourceType.getValue(), locale).getObject(messageKey);
        } catch (Exception e) {
            try {
                return (String) ResourceBundle.getBundle(messageSourceType.getValue(), Locale.US).getObject(messageKey);
            } catch (Exception ex) {
                log.error("Bundle not found: {}", messageKey);
                return null;
            }
        }
    }

    public enum MessageSourceType {
        MAIL("i18n/mail");

        private final String value;

        public String getValue() {
            return value;
        }

        MessageSourceType(String value) {
            this.value = value;
        }
    }
}
