package ro.msg.event.management.eventmanagementbackend.security;

public class InvalidJWTException extends RuntimeException {
    public InvalidJWTException(String errorMessage) {
        super(errorMessage);
    }
}
