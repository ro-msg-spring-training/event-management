package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.converter.EventUpdateConverter;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.service.OverlappingEventsException;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    private final EventUpdateConverter eventUpdateConverter;

    @GetMapping
    public List<Event> getEvents() {
        return eventService.findEvents();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventUpdateDto) {
        EventDTO eventDto;
        Event eventUpdated;

        Event event = eventUpdateConverter.convertToEntity(eventUpdateDto);
        event.setId(id);

        try {
            eventUpdated = eventService.updateEvent(event);
            eventDto = eventUpdateConverter.convertToDto(eventUpdated);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(eventDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteEvent(@PathVariable long id) {
        this.eventService.deleteEvent(id);
    }
}
