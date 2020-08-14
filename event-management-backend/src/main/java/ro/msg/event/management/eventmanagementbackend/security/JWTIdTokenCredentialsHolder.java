package ro.msg.event.management.eventmanagementbackend.security;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class JWTIdTokenCredentialsHolder {

    private String idToken;

    public String getIdToken() {
        return this.idToken;
    }

    public JWTIdTokenCredentialsHolder setIdToken(String idToken) {
        this.idToken = idToken;
        return this;
    }
}