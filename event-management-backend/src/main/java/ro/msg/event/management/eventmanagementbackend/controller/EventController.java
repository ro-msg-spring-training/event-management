package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.SortCriteria;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private static final int EVENTS_PER_PAGE = 1;

    private final EventService eventService;

    @Autowired
    private Converter<EventView, EventFilteringDto> converter;

    @GetMapping(path = "/events/{pageNumber}")
    public List<EventFilteringDto> getPaginatedFilteredEvents(@PathVariable("pageNumber") int pageNumber, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle, @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate, @RequestParam(required = false) ComparisonSign rateSign, @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople) {
        List<EventView> eventViews = eventService.filterAndPaginate(title, subtitle, status, highlighted, location, startDate, endDate, rateSign, rate, maxPeopleSign, maxPeople, pageNumber, EVENTS_PER_PAGE);
        return converter.convertAll(eventViews);
    }

    @GetMapping(path = "/events/sort/{pageNumber}")
    public List<EventFilteringDto> getPaginatedFilteredAndSortedEvents(@PathVariable("pageNumber") int pageNumber, @RequestParam(required = false) String title, @RequestParam(required = false) String subtitle, @RequestParam(required = false) Boolean status, @RequestParam(required = false) Boolean highlighted, @RequestParam(required = false) String location, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate, @RequestParam(required = false) ComparisonSign rateSign, @RequestParam(required = false) Float rate, @RequestParam(required = false) ComparisonSign maxPeopleSign, @RequestParam(required = false) Integer maxPeople, @RequestParam(required = false) SortCriteria sortCriteria, @RequestParam Boolean sortType) {
        List<EventView> eventViews = eventService.filterAndOrder(title, subtitle, status, highlighted, location, startDate, endDate, rateSign, rate, maxPeopleSign, maxPeople, pageNumber, EVENTS_PER_PAGE, sortCriteria, sortType);
        return converter.convertAll(eventViews);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteEvent(@PathVariable long id) {
        this.eventService.deleteEvent(id);
    }
}
