package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;

@Service
@RequiredArgsConstructor
public class TicketDocumentService {

    private final TicketDocumentRepository ticketDocumentRepository;
}
