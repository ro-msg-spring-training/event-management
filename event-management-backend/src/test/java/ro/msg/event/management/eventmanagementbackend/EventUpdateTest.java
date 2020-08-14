package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.service.OverlappingEventsException;

import java.time.LocalDate;
import java.time.LocalTime;
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
    private Converter<Event, EventDto> convertToDto;

    @Autowired
    private Converter<EventDto, Event> convertToEntity;

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

        Event event = new Event("title", "subt", false,  LocalDate.of(2017, 7,5),  LocalDate.of(2017, 7, 2), LocalTime.of(1,20),LocalTime.of(1,20), 110, "desc", false, "obs", false, "creator", pictures, eventSublocations, bookings);
        event.setId((long) 3);

        eventRepository.save(event);
    }

    @Test
    void updateTitles_thenGetOk() throws NoSuchElementException, ExceededCapacityException, OverlappingEventsException {
        List<String> pictures = new ArrayList<>();
        List<Long> sublocations = new ArrayList<>();
        sublocations.add((long)1);

        EventDto eventDTO = new EventDto("newTitle", "newSubtitle", true,LocalDate.of(2017, 7,5),  LocalDate.of(2017, 7, 2), LocalTime.of(1,20),LocalTime.of(1,20), 100, "description", false, "obs", true, "creator", pictures, sublocations);
        Event newEvent = convertToEntity.convert(eventDTO);
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
