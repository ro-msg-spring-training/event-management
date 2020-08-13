package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
}
