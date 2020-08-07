package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AWSCognitoJWTAuthenticationFilter awsCognitoJwtAuthenticationFilter;

    @Autowired
    public SecurityConfiguration(AWSCognitoJWTAuthenticationFilter awsCognitoJwtAuthenticationFilter) {
        this.awsCognitoJwtAuthenticationFilter = awsCognitoJwtAuthenticationFilter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().cacheControl();
        http.csrf().disable()
                .authorizeRequests()
                //public resources that do not require authentication
                .antMatchers("/api/public/**").permitAll()
                //resources that require authentication
                .antMatchers("/api/**").authenticated()
                .and()
                .addFilterBefore(awsCognitoJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}