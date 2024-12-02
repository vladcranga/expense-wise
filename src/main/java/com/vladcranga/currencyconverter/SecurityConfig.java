package com.vladcranga.currencyconverter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/users/**").permitAll()
                .requestMatchers("/api/v1/currency/**").permitAll()
                .requestMatchers("/api/v1/expenses/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}