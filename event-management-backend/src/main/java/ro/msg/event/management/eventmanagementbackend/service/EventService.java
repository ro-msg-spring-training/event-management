package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    @Transactional
    public Event updateEvent(Event event) {
        Optional<Event> eventOptional;
        eventOptional = eventRepository.findById(event.getId());

        if (eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();

            eventFromDB.setTitle(event.getTitle());
            eventFromDB.setSubtitle(event.getSubtitle());
            eventFromDB.setDescription(event.getDescription());
            eventFromDB.setStartDate(event.getStartDate());
            eventFromDB.setEndDate(event.getEndDate());
            eventFromDB.setMaxPeople(event.getMaxPeople());
            eventFromDB.setCreator(event.getCreator());
            eventFromDB.setHighlighted(event.isHighlighted());
            eventFromDB.setStatus(event.isStatus());
            eventFromDB.setNoTicketEvent(event.isNoTicketEvent());
            eventFromDB.setObservations(event.getObservations());
            eventFromDB.getPictures().addAll(event.getPictures());

            return eventRepository.save(eventFromDB);
        } else
            throw new NoSuchElementException();
    }

    public List<Event> findEvents() {
        return eventRepository.findAll();
    }

}
