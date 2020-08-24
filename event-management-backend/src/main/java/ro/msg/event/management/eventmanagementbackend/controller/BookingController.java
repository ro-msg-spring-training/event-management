package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.BookingService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
@AllArgsConstructor
@CrossOrigin
public class BookingController {
    private BookingService bookingService;
    private Converter<BookingSaveDto, Booking> bookingSaveReverseConverter;

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<String> saveBooking(@RequestBody BookingSaveDto bookingSaveDto) {
        try {
            Booking booking = bookingSaveReverseConverter.convert(bookingSaveDto);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            booking.setUser(user.getIdentificationString());

            //a new converter could be created that deals with this map
            Map<Long, List<Ticket>> categoryIdsWithTickets = new HashMap<>();
            bookingSaveDto.getTickets().forEach(ticketSaveDto ->
            {
                Ticket ticket = Ticket.builder()
                        .name(ticketSaveDto.getName())
                        .emailAddress(bookingSaveDto.getEmail())
                        .build();
                if (categoryIdsWithTickets.containsKey(ticketSaveDto.getTicketCategoryId())) {
                    categoryIdsWithTickets.get(ticketSaveDto.getTicketCategoryId()).add(ticket);
                } else {
                    List<Ticket> tickets = new ArrayList<>();
                    tickets.add(ticket);
                    categoryIdsWithTickets.put(ticketSaveDto.getTicketCategoryId(), tickets);
                }
            });
            Booking savedBooking = this.bookingService.saveBooking(booking, categoryIdsWithTickets, bookingSaveDto.getEventId());
            return new ResponseEntity<>("saved", HttpStatus.OK);
        } catch (TicketBuyingException ticketBuyingException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ticketBuyingException.getMessage(), ticketBuyingException);
        }
    }
}
