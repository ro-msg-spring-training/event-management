package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public TicketCategory validateAndReturnTicketCategory(Event event, Map.Entry<Long, List<Ticket>> categoryWithTickets) throws TicketBuyingException {
        List<TicketCategory> ticketCategories = event.getTicketCategories();
        TicketCategory ticketCategory = ticketCategories.stream()
                .filter(category -> category.getId().equals(categoryWithTickets.getKey()))
                .findFirst()
                .orElseThrow(() -> {
                    throw new NoSuchElementException("No ticket category with id=" + categoryWithTickets.getKey());
                });

        long numberOfExistingTicketsForCategory = ticketCategory.getTickets().size();
        if (numberOfExistingTicketsForCategory + categoryWithTickets.getValue().size() > ticketCategory.getTicketsPerCategory()) {
            throw new TicketBuyingException("Number of tickets per category exceeds the maximum value!");
        }
        return ticketCategory;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking saveBooking(Booking booking, Map<Long, List<Ticket>> categoryIdsWithTickets, long eventId) {
        Optional<Event> eventOptional = this.eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + eventId);
        }
        Event event = eventOptional.get();

        long numberOfTicketsToPurchase = categoryIdsWithTickets.values().stream().mapToInt(List::size).sum();

        //each user can buy only a certain amount of tickets at an event
        long totalNumberOfExistingTicketsForUserAtEvent = this.bookingRepository.countByUserAndEvent(booking.getUser(), event);
        if (totalNumberOfExistingTicketsForUserAtEvent + numberOfTicketsToPurchase > event.getTicketsPerUser()) {
            throw new TicketBuyingException("Number of tickets exceeds maximum number of tickets per user!");
        }

        //each ticket category has a certain amount of tickets that cannot be exceeded
        List<Ticket> ticketsToSave = new ArrayList<>();
        for (Map.Entry<Long, List<Ticket>> entry : categoryIdsWithTickets.entrySet()) {
            TicketCategory ticketCategory = this.validateAndReturnTicketCategory(event, entry);
            //set values for the tickets
            entry.getValue().forEach(ticket ->
            {
                ticket.setTicketCategory(ticketCategory);
                ticket.setBooking(booking);
                ticketsToSave.add(ticket);
            });
        }

        event.getBookings().add(booking);
        booking.setEvent(event);
        booking.setTickets(ticketsToSave);
        return this.bookingRepository.save(booking);
    }
}
