package ro.msg.event.management.eventmanagementbackend.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.proc.BadJOSEException;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import net.minidev.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.exception.InvalidJWTException;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;

import static java.util.List.of;

@Component
public class AWSCognitoIdTokenProcessor {

    private final JWTConfiguration jwtConfiguration;
    private final ConfigurableJWTProcessor<SecurityContext> configurableJWTProcessor;

    @Autowired
    public AWSCognitoIdTokenProcessor(JWTConfiguration jwtConfiguration, ConfigurableJWTProcessor<SecurityContext> configurableJWTProcessor) {
        this.jwtConfiguration = jwtConfiguration;
        this.configurableJWTProcessor = configurableJWTProcessor;
    }

    public Authentication authenticate(HttpServletRequest request) throws ParseException, JOSEException, BadJOSEException {
        String idToken = request.getHeader(this.jwtConfiguration.getHttpHeader());
        if (idToken != null) {
            JWTClaimsSet claims = this.configurableJWTProcessor.process(this.getBearerToken(idToken), null);
            validateIssuer(claims);
            verifyIfIdToken(claims);
            String username = getUserNameFrom(claims);
            String role = this.getRole(claims);
            if (username != null) {
                List<GrantedAuthority> grantedAuthorities = of(new SimpleGrantedAuthority(role));
                User user = new User(this.getEmail(claims), username, this.getFirstName(claims), this.getLastName(claims), this.getIdentificationString(claims), this.getRole(claims));
                return new JWTAuthentication(user, claims, grantedAuthorities);
            }
        }
        return null;
    }

    private String getUserNameFrom(JWTClaimsSet claims) {
        return claims.getClaims().get(this.jwtConfiguration.getUserNameField()).toString();
    }

    private String getRole(JWTClaimsSet claims) {
        JSONArray jsonArray = (JSONArray) claims.getClaims().get("cognito:groups");
        if (jsonArray == null) {
            return "ROLE_USER";
        }
        String[] groups = (String[]) jsonArray.toArray(new String[0]);
        return groups[0];
    }

    private String getFirstName(JWTClaimsSet claims) {
        return claims.getClaims().get("given_name").toString();
    }

    private String getLastName(JWTClaimsSet claims) {
        return claims.getClaims().get("family_name").toString();
    }

    private String getEmail(JWTClaimsSet claims) {
        return claims.getClaims().get("email").toString();
    }

    private String getIdentificationString(JWTClaimsSet claims) {
        return claims.getClaims().get("sub").toString();
    }

    private void verifyIfIdToken(JWTClaimsSet claims) {
        if (!claims.getIssuer().equals(this.jwtConfiguration.getCognitoIdentityPoolUrl())) {
            throw new InvalidJWTException("JWT is not an ID Token");
        }
    }

    private void validateIssuer(JWTClaimsSet claims) {
        if (!claims.getIssuer().equals(this.jwtConfiguration.getCognitoIdentityPoolUrl())) {
            throw new InvalidJWTException(String.format("Issuer %s does not match Cognito idp %s", claims.getIssuer(), this.jwtConfiguration.getCognitoIdentityPoolUrl()));
        }
    }

    private String getBearerToken(String token) {
        return token.startsWith("Bearer ") ? token.substring("Bearer ".length()) : token;
    }
}
