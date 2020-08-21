package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository ;


    public List<AvailableTicketsPerCategory> getRemainingTickets(Long id){
        List<AvailableTicketsPerCategory> list = ticketRepository.getAvailableTicketsForEvent(id);
        return list;
    }
}
