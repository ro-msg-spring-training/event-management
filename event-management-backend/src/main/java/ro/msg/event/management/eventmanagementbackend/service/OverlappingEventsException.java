package ro.msg.event.management.eventmanagementbackend.service;

public class OverlappingEventsException extends Exception{
    public OverlappingEventsException(String message) {
        super(message);
    }
}
