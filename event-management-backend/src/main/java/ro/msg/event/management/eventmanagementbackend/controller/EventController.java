package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.EventReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.CardsEventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCategoryException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.EventSublocationService;
import ro.msg.event.management.eventmanagementbackend.service.LocationService;
import ro.msg.event.management.eventmanagementbackend.service.SublocationService;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@CrossOrigin
public class EventController {

    private static final int EVENTS_PER_LISTING_PAGE = 5;
    private static final int EVENTS_PER_CARD = 4;

    private final EventService eventService;
    private final SublocationService sublocationService;
    private final EventSublocationService eventSublocationService;
    private final Converter<Event, EventDto> convertToDto;
    private final Converter<EventDto, Event> convertToEntity;
    private final Converter<EventView, EventFilteringDto> converter;
    private final Converter<EventView, EventListingDto> converterToListingDto;
    private final Converter<EventView, CardsEventDto> converterToCardsEventDto;
    private final LocationService locationService;

    private static final LocalDate MAX_DATE = LocalDate.parse("2999-12-31");
    private static final LocalDate MIN_DATE = LocalDate.parse("1900-01-01");

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> getEvent(@PathVariable long id) {
        try {
            EventDto eventDto = convertToDto.convert(this.eventService.getEvent(id));
            return new ResponseEntity<>(eventDto, HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> saveEvent(@RequestBody EventDto eventDTO) {
        try {

            long locationId = eventDTO.getLocation();

            Location location = this.locationService.findByID(locationId);
            List<Long> sublocationIDs = location.getSublocation().stream()
                    .map(BaseEntity::getId)
                    .collect(Collectors.toList());


            Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventDTO, false);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();

            String creator = user.getIdentificationString();
            event.setCreator(creator);

            Event savedEvent = eventService.saveEvent(event, sublocationIDs);

            return new ResponseEntity<>(convertToDto.convert(savedEvent), HttpStatus.OK);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        } catch (DateTimeException dateTimeException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, dateTimeException.getMessage(), dateTimeException);
        } catch (TicketCategoryException ticketCategoryException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCategoryException.getMessage(), ticketCategoryException);
        }
    }


    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EventFilteringDto>> getPaginatedFilteredAndSortedEvents(@RequestParam int pageNumber, @RequestParam int limit, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle, @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location,
                                                                                       @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate, @RequestParam(required = false) String startHour, @RequestParam(required = false) String endHour, @RequestParam(required = false) ComparisonSign rateSign,
                                                                                       @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople, @RequestParam(required = false) SortCriteria sortCriteria, @RequestParam(required = false) Boolean sortType) {
        try {
            List<EventView> eventViews = eventService.filterAndPaginate(title, subtitle, status, highlighted, location, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null, startHour != null ? LocalTime.parse(startHour) : null, endHour != null ? LocalTime.parse(endHour) : null, rateSign, rate, maxPeopleSign, maxPeople, pageNumber, limit, sortCriteria, sortType);
            return new ResponseEntity<>(converter.convertAll(eventViews), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @RequestBody EventDto eventUpdateDto) {
        EventDto eventDto;
        Event eventUpdated;

        Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventUpdateDto, true);
        event.setId(id);

        try {
            List<Long> ticketCategoryToDelete = eventUpdateDto.getTicketCategoryToDelete();
            eventUpdated = eventService.updateEvent(event, ticketCategoryToDelete, eventUpdateDto.getLocation());
            eventDto = convertToDto.convert(eventUpdated);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        } catch (OverlappingEventsException | ExceededCapacityException overlappingEventsException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, overlappingEventsException.getMessage(), overlappingEventsException);
        } catch (DateTimeException dateTimeException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, dateTimeException.getMessage(), dateTimeException);
        } catch (TicketCategoryException ticketCategoryException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCategoryException.getMessage(), ticketCategoryException);
        }
        return new ResponseEntity<>(eventDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteEvent(@PathVariable long id) {

        try {
            this.eventService.deleteEvent(id);
            return new ResponseEntity<>("Event deleted", HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }
    }

    @GetMapping("/lastPage")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Integer getNumberOfPages(@RequestParam int limit, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle,
                                    @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate,
                                    @RequestParam(required = false) String startHour, @RequestParam(required = false) String endHour, @RequestParam(required = false) ComparisonSign rateSign, @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople) {
        return eventService.getNumberOfPages(title, subtitle, status, highlighted, location, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null, startHour != null ? LocalTime.parse(startHour) : null, endHour != null ? LocalTime.parse(endHour) : null, rateSign, rate, maxPeopleSign, maxPeople, limit);
    }

    @GetMapping("/latest/{pageNumber}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<EventListingDto>> chronologicalPaginatedEvents(@PathVariable int pageNumber) {
        try {
            List<EventView> eventViews = eventService.filterAndPaginate(null, null, null, null, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, pageNumber, EVENTS_PER_LISTING_PAGE, SortCriteria.DATE, true);
            return new ResponseEntity<>(converterToListingDto.convertAll(eventViews), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }

    @GetMapping("/upcoming")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CardsEventDto>> upcomingEvents() {
        try {
            List<EventView> eventViews = eventService.filterAndPaginate(null, null, null, null, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, 1, EVENTS_PER_CARD, SortCriteria.DATE, true);
            return new ResponseEntity<>(converterToCardsEventDto.convertAll(eventViews), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CardsEventDto>> historyEvents() {
        try {
            List<EventView> eventViews = eventService.filterAndPaginate(null, null, null, null, null, MIN_DATE, LocalDate.now(), null, null, null, null, null, null, 1, EVENTS_PER_CARD, SortCriteria.DATE, false);
            return new ResponseEntity<>(converterToCardsEventDto.convertAll(eventViews), HttpStatus.OK);
        } catch (IndexOutOfBoundsException indexOutOfBoundsException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, indexOutOfBoundsException.getMessage(), indexOutOfBoundsException);
        }
    }
}

