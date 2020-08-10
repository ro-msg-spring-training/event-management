package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.converter.EventUpdateConverter;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    private final EventUpdateConverter eventUpdateConverter;

    @GetMapping("events")
    public List<Event> getEvents() {
        return eventService.findEvents();
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventUpdateDto) {
        EventDTO eventDto;
        Event eventUpdated;

        Event event = eventUpdateConverter.convertToEntity(eventUpdateDto);
        event.setId(id);

        try {
            eventUpdated = eventService.updateEvent(event);
            eventDto = eventUpdateConverter.convertToDto(eventUpdated);
        } catch (NoSuchElementException exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(eventDto, HttpStatus.OK);
    }
}
