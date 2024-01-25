package org.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.web.servlet.function.RequestPredicates.headers;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private HandlerMappingIntrospector introspector;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        MvcRequestMatcher apiMatcher = new MvcRequestMatcher(introspector, "/api/users");
        apiMatcher.setMethod(HttpMethod.POST);

        AntPathRequestMatcher h2ConsoleMatcher = new AntPathRequestMatcher("/h2-console/**");

        http.csrf(csrf -> csrf.disable())
                .authorizeRequests(auth -> auth
                        .requestMatchers(apiMatcher).permitAll()
                        .requestMatchers(h2ConsoleMatcher).permitAll()
                        .anyRequest().authenticated()
                )
            .headers().frameOptions().disable();


        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder (){
        return new BCryptPasswordEncoder();
    }

}
