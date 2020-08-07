package ro.msg.event.management.eventmanagementbackend.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping(path = "/api/hello")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getResp() {
        return "Hey authenticated admin!";
    }

    @GetMapping(path = "/api/hello2")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public String getRespUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        return "Hey authenticated " + user.getIdentificationString();
    }

    @GetMapping(path = "/api/public/hello")
    public String getPublicResponse() {
        return "PUBLIC";
    }
}
