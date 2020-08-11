package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final SublocationRepository sublocationRepository;

    @Transactional
    public Event updateEvent(Event event) throws OverlappingEventsException, ExceededCapacityException {
        Optional<Event> eventOptional;
        eventOptional = eventRepository.findById(event.getId());

        if (eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();

            LocalDateTime start = event.getStartDate();
            LocalDateTime end = event.getEndDate();

            boolean validSublocation = true;
            int sumCapacity = 0;

            List<Long> sublocationsId = eventFromDB.getEventSublocations()
                    .stream()
                    .map(EventSublocation::getSublocation)
                    .map(Sublocation::getId)
                    .collect(Collectors.toList());

            for (Long subId : sublocationsId) {
                if (!checkOverlappingEvents(eventFromDB.getId(), start, end, subId)) {
                    validSublocation = false;
                }
                sumCapacity += sublocationRepository.getOne(subId).getMaxCapacity();
            }

            if (validSublocation) {
                if (sumCapacity >= event.getMaxPeople()) {
                    eventFromDB.setStartDate(start);
                    eventFromDB.setEndDate(end);
                    eventFromDB.setTitle(event.getTitle());
                    eventFromDB.setSubtitle(event.getSubtitle());
                    eventFromDB.setDescription(event.getDescription());
                    eventFromDB.setMaxPeople(event.getMaxPeople());
                    eventFromDB.setCreator(event.getCreator());
                    eventFromDB.setHighlighted(event.isHighlighted());
                    eventFromDB.setStatus(event.isStatus());
                    eventFromDB.setNoTicketEvent(event.isNoTicketEvent());
                    eventFromDB.setObservations(event.getObservations());
                    eventFromDB.getPictures().addAll(event.getPictures());

                    return eventRepository.save(eventFromDB);

                } else throw new ExceededCapacityException("exceed capacity");
            } else throw new OverlappingEventsException("overlaps other events");

        } else
            throw new NoSuchElementException();
    }

    public List<Event> findEvents() {
        return eventRepository.findAll();
    }

    public boolean checkOverlappingEvents(Long eventID, LocalDateTime start, LocalDateTime end, long sublocation) {
        List<Event> foundEvents = eventRepository.findOverlappingEvents(start, end, sublocation);
        List<Event> overlapingEvents = foundEvents
                .stream()
                .filter(event -> !event.getId().equals(eventID))
                .collect(Collectors.toList());
        return overlapingEvents.isEmpty();
    }

}
