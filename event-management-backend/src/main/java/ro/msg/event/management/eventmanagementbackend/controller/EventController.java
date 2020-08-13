package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Local;
import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocationID;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@Slf4j
public class EventController {

    private static final int EVENTS_PER_PAGE = 2;

    private final EventService eventService;
    private final PictureService pictureService;
    private final SublocationService sublocationService;
    private final EventSublocationService eventSublocationService;
    private final Converter<Event, EventDto> convertToDto;
    private final Converter<EventDto, Event> convertToEntity;
    private final Converter<EventView, EventFilteringDto> converter;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> saveEvent(@RequestBody EventDto eventDTO) {
        try {

            List<Long> sublocationIDs = eventDTO.getSubLocation();

            ModelMapper modelMapper = new ModelMapper();
            Event event = modelMapper.map(eventDTO, Event.class);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();

            String creator = user.getIdentificationString();
            event.setCreator(creator);

            long eventID = eventService.saveEvent(event, sublocationIDs);

            eventDTO.getPictureURL().forEach(url -> pictureService.savePicture(new Picture(url, event)));

            sublocationIDs.forEach(sublocationID -> {

                EventSublocationID esID = new EventSublocationID(eventID, sublocationID);
                EventSublocation eventSublocation = new EventSublocation();
                eventSublocation.setEventSublocationID(esID);
                eventSublocation.setEvent(event);
                eventSublocation.setSublocation(sublocationService.findById(sublocationID));
                eventSublocationService.saveES(eventSublocation);
            });

            return new ResponseEntity<>(modelMapper.map(event, EventDto.class), HttpStatus.OK);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        }
    }

    @GetMapping("/{pageNumber}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EventFilteringDto>> getPaginatedFilteredEvents(@PathVariable("pageNumber") int pageNumber, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle,
                                                                              @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate,
                                                                              @RequestParam(required = false) String startHour, @RequestParam(required = false) String endHour, @RequestParam(required = false) ComparisonSign rateSign, @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople) {
        List<EventView> eventViews = eventService.filterAndPaginate(title, subtitle, status, highlighted, location,startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null,startHour != null ? LocalTime.parse(startHour) : null,endHour != null ? LocalTime.parse(endHour) : null, rateSign, rate, maxPeopleSign, maxPeople, pageNumber, EVENTS_PER_PAGE);
        return new ResponseEntity<>(converter.convertAll(eventViews), HttpStatus.OK);
    }

    @GetMapping("/sort/{pageNumber}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EventFilteringDto>> getPaginatedFilteredAndSortedEvents(@PathVariable("pageNumber") int pageNumber, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle, @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location,
                                                                                       @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate, @RequestParam(required = false) String startHour, @RequestParam(required = false) String endHour, @RequestParam(required = false) ComparisonSign rateSign,
                                                                                       @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople, @RequestParam(required = false) SortCriteria sortCriteria, @RequestParam Boolean sortType) {
        List<EventView> eventViews = eventService.filterAndOrder(title, subtitle, status, highlighted, location, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null,startHour != null ? LocalTime.parse(startHour) : null,endHour != null ? LocalTime.parse(endHour) : null, rateSign, rate, maxPeopleSign, maxPeople, pageNumber, EVENTS_PER_PAGE, sortCriteria, sortType);
        return new ResponseEntity<>(converter.convertAll(eventViews), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @RequestBody EventDto eventUpdateDto) {
        EventDto eventDto;
        Event eventUpdated;

        Event event = convertToEntity.convert(eventUpdateDto);
        event.setId(id);

        try {
            eventUpdated = eventService.updateEvent(event);
            eventDto = convertToDto.convert(eventUpdated);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        }
        return new ResponseEntity<>(eventDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteEvent(@PathVariable long id) {

        this.eventService.deleteEvent(id);
    }
}

