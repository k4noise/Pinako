package com.kyeeego.digitalportfolio.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ResourceWebConfig implements WebMvcConfigurer {

    private final Environment environment;

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        var location = environment.getProperty("app.file.storage.mapping");

        registry.addResourceHandler("/uploads/**").addResourceLocations(location);
    }
}