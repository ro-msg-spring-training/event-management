package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.embeddedid.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

}
