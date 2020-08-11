package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ro.msg.event.management.eventmanagementbackend.converter.EventUpdateConverter;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.service.OverlappingEventsException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
class EventUpdateTest {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventUpdateConverter eventUpdateConverter;

    @Autowired
    private EventService eventService;

    @BeforeEach
    public void setUp() {
        List<EventSublocation> eventSublocations = new ArrayList<>();
        List<Picture> pictures = new ArrayList<>();
        Picture picture = new Picture();
        picture.setUrl("img_url");
        pictures.add(picture);
        List<Booking> bookings = new ArrayList<>();

        Event event = new Event("title", "subt", false,  LocalDateTime.of(2017, 7, 3, 2, 34),  LocalDateTime.of(2017, 7, 2, 2, 34), 110, "desc", false, "obs", false, "creator", pictures, eventSublocations, bookings);
        event.setId((long) 3);

        eventRepository.save(event);
    }

    @Test
    void updateTitles_thenGetOk() throws NoSuchElementException, ExceededCapacityException, OverlappingEventsException {
        List<String> pictures = new ArrayList<>();

        EventDTO eventDTO = new EventDTO("newTitle", "newSubtitle", true, LocalDateTime.of(2017, 7, 3, 2, 54), LocalDateTime.of(2017, 7, 2, 2, 20), 100, "description", false, "obs", true, "creator", pictures, (long)1);
        Event newEvent = eventUpdateConverter.convertToEntity(eventDTO);
        newEvent.setId((long) 1);

        eventService.updateEvent(newEvent);

        Optional<Event> eventOptional = eventRepository.findById(newEvent.getId());
        if (eventOptional.isPresent()) {
            Event eventFromDb = eventOptional.get();
            assert (eventFromDb.getTitle().equals(eventDTO.getTitle()));
            assert (eventFromDb.getSubtitle().equals(eventDTO.getSubtitle()));
        } else {
            throw new NoSuchElementException();
        }
    }
}