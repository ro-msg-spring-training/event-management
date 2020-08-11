package ro.msg.event.management.eventmanagementbackend.service;

public class ExceededCapacityException extends Exception {
    public ExceededCapacityException(String message) {
        super(message);
    }
}
