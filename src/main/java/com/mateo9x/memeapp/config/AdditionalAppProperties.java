package com.mateo9x.memeapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.NotNull;

@Configuration
public class AdditionalAppProperties {

    @Value("${app.frontend.url}")
    @NotNull
    private String appFrontendUrl;
}
