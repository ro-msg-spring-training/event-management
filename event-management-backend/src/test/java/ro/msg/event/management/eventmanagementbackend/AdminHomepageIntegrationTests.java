package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.repository.*;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@SpringBootTest
public class AdminHomepageIntegrationTests {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SublocationRepository sublocationRepository;

    @Autowired
    private EventSublocationRepository eventSublocationRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventService eventService;

    private static final LocalDate MAX_DATE = LocalDate.parse("2999-12-31");
    private static final LocalDate MIN_DATE = LocalDate.parse("1900-01-01");

    @Test
    public void test_card_with_events() {
        Event event1 = new Event("Tile", "Subtitle", true, LocalDate.parse("2020-11-11"), LocalDate.parse("2020-11-15"), LocalTime.parse("18:00"), LocalTime.parse("20:00"), 10, "descr", true, "no obs", 3, "someUser","ticket info", null, null, null, null);
        Event event2 = new Event("Tile2", "Subtitle2", true, LocalDate.parse("2020-11-14"), LocalDate.parse("2020-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser","ticket info", null, null, null, null);
        Event event3 = new Event("Tile3", "Subtitle3", true, LocalDate.parse("2021-11-14"), LocalDate.parse("2021-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser","ticket info", null, null, null, null);
        Event event4 = new Event("Tile3", "Subtitle3", true, LocalDate.parse("2019-11-14"), LocalDate.parse("2019-11-19"), LocalTime.parse("10:00"), LocalTime.parse("12:00"), 12, "descr2", true, "no obs", 3, "someUser","ticket info", null, null, null, null);
        Location location1 = new Location("Campus", "Obs 23", (float) 34.55, (float) 55.76, null, null);
        Location location2 = new Location("Centru", "Ferdinand 45", (float) 44.6, (float) 99.0, null, null);
        Sublocation sublocation1 = new Sublocation("same", 15, location1, null);
        Sublocation sublocation2 = new Sublocation("sameCentru", 20, location2, null);
        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);
        eventRepository.save(event4);
        locationRepository.save(location1);
        locationRepository.save(location2);
        sublocationRepository.save(sublocation1);
        sublocationRepository.save(sublocation2);

        EventSublocation eventSublocation1 = new EventSublocation(event1, sublocation1);
        EventSublocationID eventSublocationID1 = new EventSublocationID(event1.getId(), sublocation1.getId());
        eventSublocation1.setEventSublocationID(eventSublocationID1);


        EventSublocation eventSublocation2 = new EventSublocation(event2, sublocation2);
        EventSublocationID eventSublocationID2 = new EventSublocationID(event2.getId(), sublocation2.getId());
        eventSublocation2.setEventSublocationID(eventSublocationID2);

        eventSublocationRepository.save(eventSublocation1);
        eventSublocationRepository.save(eventSublocation2);

        Booking booking11 = new Booking(LocalDateTime.now(), "someUser", event1, null);
        Booking booking12 = new Booking(LocalDateTime.now(), "otherUser", event1, null);

        Ticket ticket111 = new Ticket("Andrei", "email@yahoo.com", booking11, null, null);
        Ticket ticket112 = new Ticket("Ioana", "ioa@yahoo.com", booking11, null, null);
        Ticket ticket121 = new Ticket("Maria", "ma@yahoo.com", booking12, null, null);

        bookingRepository.save(booking11);
        bookingRepository.save(booking12);
        ticketRepository.save(ticket111);
        ticketRepository.save(ticket112);
        ticketRepository.save(ticket121);


        List<EventView> eventViewList = eventService.filterAndPaginate(null, null, null, null, null, LocalDate.now(), MAX_DATE, null, null, null, null, null, null, 1, 4, SortCriteria.DATE, true);
        EventView eventViewBefore = eventViewList.get(0);
        for (EventView eventView : eventViewList){
            if (eventView.getStartDate().isBefore(eventViewBefore.getStartDate()) && !(eventView.getStartDate().isEqual(eventViewBefore.getStartDate()))){
                assert(false);
            }
            eventViewBefore.setStartDate(eventView.getStartDate());
        }
    }
}
