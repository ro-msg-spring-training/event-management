package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class SecurityExceptionsHandler {
    @ExceptionHandler({AccessDeniedException.class, AuthenticationException.class})
    public ResponseEntity<String> sendResponseForSecurityExceptions(Exception securityException) {
        if (securityException instanceof AccessDeniedException) {
            return new ResponseEntity<>("Access Denied", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>("Invalid/Expired Token", HttpStatus.UNAUTHORIZED);
    }
}
