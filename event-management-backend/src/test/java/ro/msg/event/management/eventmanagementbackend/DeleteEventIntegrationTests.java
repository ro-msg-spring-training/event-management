package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class DeleteEventIntegrationTests {
    private final EventService eventService;
    private final EventRepository eventRepository;

    @Autowired
    public DeleteEventIntegrationTests(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @Test
    void deleteEvent_existingEvent_eventDeleted() {
        Event event1 = new Event();
        event1.setTitle("event1");
        Event event2 = new Event();
        event2.setTitle("event2");

        this.eventRepository.save(event1);
        this.eventRepository.save(event2);

        long beforeCount = this.eventRepository.count();

        this.eventService.deleteEvent(1);

        assertThat(this.eventRepository.count()).isEqualTo(beforeCount - 1);
    }

    @Test
    void deleteEvent_noEventWithSuchId_exceptionThrown() {
        Event event1 = new Event();
        event1.setTitle("event1");
        Event event2 = new Event();
        event2.setTitle("event2");

        this.eventRepository.save(event1);
        this.eventRepository.save(event2);

        try {
            this.eventService.deleteEvent(-1);
            assert false;
        }
        catch (NoSuchElementException noSuchElementException)
        {
            assert true;
        }

        try {
            this.eventService.deleteEvent(3);
            assert false;
        }
        catch (NoSuchElementException noSuchElementException)
        {
            assert true;
        }
    }
}
