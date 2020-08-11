package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final SublocationRepository sublocationRepository;

    public long saveEvent(Event event, List<Long> sublocations) throws Exception {

        LocalDateTime start = event.getStartDate();
        LocalDateTime end = event.getEndDate();
        boolean validSublocations = true;
        int sumCapacity = 0;
        for(Long l : sublocations){
            if(!checkOverlappingEvents(start,end,l)){
                validSublocations = false;
            }
            sumCapacity += sublocationRepository.getOne(l).getMaxCapacity();
        }

        if(validSublocations && sumCapacity>= event.getMaxPeople()) {
            return eventRepository.save(event).getId();
        }

        throw new Exception("Event overlaps other events or exceeds capacity");
    }

    public boolean checkOverlappingEvents(LocalDateTime start, LocalDateTime end, long sublocation){
        List<Event> overlappingEvents =eventRepository.findOverlappingEvents(start,end,sublocation);
        return overlappingEvents.isEmpty();
    }

}
