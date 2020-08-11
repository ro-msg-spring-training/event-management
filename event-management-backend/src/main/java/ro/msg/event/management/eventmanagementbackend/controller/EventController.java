package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.embeddedid.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.security.User;
import java.util.List;

import ro.msg.event.management.eventmanagementbackend.converter.EventUpdateConverter;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.EventSublocationService;
import ro.msg.event.management.eventmanagementbackend.service.PictureService;
import ro.msg.event.management.eventmanagementbackend.service.SublocationService;

import java.util.NoSuchElementException;
import ro.msg.event.management.eventmanagementbackend.service.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.service.OverlappingEventsException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final PictureService pictureService;
    private final SublocationService sublocationService;
    private final EventSublocationService eventSublocationService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Event saveEvent(@RequestBody EventDTO eventDTO) throws Exception {


        List<Long> sublocationIDs = eventDTO.getSubLocation();

        ModelMapper modelMapper = new ModelMapper();
        Event event = modelMapper.map(eventDTO, Event.class);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        String creator = user.getIdentificationString();
        event.setCreator(creator);

        long eventID = eventService.saveEvent(event, sublocationIDs);

        eventDTO.getPictureURL().forEach((url) -> pictureService.savePicture(new Picture(url, event)));

        sublocationIDs.forEach((sublocationID) -> {

            EventSublocationID esID = new EventSublocationID(eventID, sublocationID);
            EventSublocation eventSublocation = new EventSublocation();
            eventSublocation.setEventSublocationID(esID);
            eventSublocation.setEvent(event);
            eventSublocation.setSublocation(sublocationService.findById(sublocationID));
            eventSublocationService.saveES(eventSublocation);
        });

        return event;
    }

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
