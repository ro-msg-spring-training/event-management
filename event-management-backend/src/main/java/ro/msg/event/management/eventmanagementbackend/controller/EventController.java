package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
}
