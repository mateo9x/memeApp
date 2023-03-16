package com.mateo9x.memeapp.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.validation.constraints.NotNull;

@Data
@Configuration
public class AdditionalAppProperties {

    @Value("${app.frontend.url}")
    @NotNull
    private String appFrontendUrl;

    @Value("${app.dns}")
    @NotNull
    private String appDNS;
}
