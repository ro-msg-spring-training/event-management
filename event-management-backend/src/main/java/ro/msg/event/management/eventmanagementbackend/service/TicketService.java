package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;
import ro.msg.event.management.eventmanagementbackend.security.User;

import java.io.InputStream;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private static final String ticketsBucketName = "event-management-tickets";

    public List<AvailableTicketsPerCategory> getAvailableTickets(Long id){
        Optional<Event> event = eventRepository.findById(id);
        if (event.isEmpty()){
            throw new NoSuchElementException("There is no event with id "+ id);
        }
         return event.get().getTicketCategories().stream().map(category -> new AvailableTicketsPerCategory(category.getTitle(), (long)category.getTickets().size(), (long) category.getTicketsPerCategory() - (long)category.getTickets().size())).collect(Collectors.toList());

    }

    public InputStream getPdf(long id) {
        Optional<Ticket> ticketOptional = this.ticketRepository.findById(id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        if(ticketOptional.isEmpty() || !(ticketOptional.get().getBooking().getUser().equals(user.getIdentificationString())))
        {
            throw new NoSuchElementException("No ticket with id= " + id + "for this user!");
        }

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new InstanceProfileCredentialsProvider(false))
                .build();

        return s3Client.getObject(ticketsBucketName, id + ".pdf").getObjectContent();
    }
}
