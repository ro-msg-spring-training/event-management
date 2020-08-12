package ro.msg.event.management.eventmanagementbackend.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class AWSCognitoJWTAuthenticationFilter extends GenericFilter {

    private final AWSCognitoIdTokenProcessor cognitoIdTokenProcessor;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        Authentication authentication;
        try {
            authentication = this.cognitoIdTokenProcessor.authenticate((HttpServletRequest) request);
            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception exception) {
            log.error("Cognito ID Token processing error", exception);
            SecurityContextHolder.clearContext();
            throw new InvalidJWTException("Cognito ID token processing error: " + exception.toString());
        }
        filterChain.doFilter(request, response);
    }
}

