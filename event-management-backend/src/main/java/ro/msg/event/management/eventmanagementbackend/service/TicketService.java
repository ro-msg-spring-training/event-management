package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final EventRepository eventRepository;

    public List<AvailableTicketsPerCategory> getRemainingTickets(Long id){
        Optional<Event> event = eventRepository.findById(id);
        if (event.isEmpty()){
            throw new NoSuchElementException("There is no event with id "+ id);
        }
        return event.get().getTicketCategories().stream().map(category -> new AvailableTicketsPerCategory(category.getTitle(), (long)category.getTicketsPerCategory() - category.getTickets().size())).collect(Collectors.toList());

    }
}
