package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.stereotype.Component;

@Component
public class JWTIdTokenCredentialsHolder {

    private String idToken;

    public JWTIdTokenCredentialsHolder() {
    }

    public String getIdToken() {
        return this.idToken;
    }

    public JWTIdTokenCredentialsHolder setIdToken(String idToken) {
        this.idToken = idToken;
        return this;
    }
}