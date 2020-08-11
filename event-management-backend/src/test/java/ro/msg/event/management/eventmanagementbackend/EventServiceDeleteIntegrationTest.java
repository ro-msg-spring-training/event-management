package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.service.EventService;

@SpringBootTest
class EventServiceDeleteIntegrationTest {
    private final EventService eventService;
    private final EventRepository eventRepository;

    @Autowired
    public EventServiceDeleteIntegrationTest(EventService eventService, EventRepository eventRepository) {
        this.eventService = eventService;
        this.eventRepository = eventRepository;
    }

    @Test
    void deleteEventTest() {
        long currentId = this.eventRepository.count();
        this.eventRepository.deleteAll();

        Event event1 = new Event();
        event1.setTitle("event1");
        Event event2 = new Event();
        event2.setTitle("event2");

        this.eventRepository.save(event1);
        this.eventRepository.save(event2);

        assert this.eventRepository.count() == 2;

        this.eventService.deleteEvent(currentId + 1);

        assert this.eventRepository.count() == 1;
    }
}
