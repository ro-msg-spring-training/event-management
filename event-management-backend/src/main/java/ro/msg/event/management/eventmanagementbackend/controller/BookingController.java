package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.CategoryAndTicketsMapReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingCalendarDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.BookingService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/bookings")
@AllArgsConstructor
@CrossOrigin
public class BookingController {
    private final BookingService bookingService;
    private final Converter<BookingSaveDto, Booking> bookingSaveReverseConverter;
    private final Converter<Booking, BookingDto> bookingConverter;

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<BookingDto> saveBooking(@RequestBody BookingSaveDto bookingSaveDto) {
        try {
            Booking booking = bookingSaveReverseConverter.convert(bookingSaveDto);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            booking.setUser(user.getIdentificationString());

            CategoryAndTicketsMapReverseConverter categoryAndTicketsMapReverseConverter = new CategoryAndTicketsMapReverseConverter();
            categoryAndTicketsMapReverseConverter.setBookingEmail(bookingSaveDto.getEmail());

            Booking savedBooking = this.bookingService.saveBooking(booking, categoryAndTicketsMapReverseConverter.convert(bookingSaveDto.getTickets()), bookingSaveDto.getEventId());
            return new ResponseEntity<>(this.bookingConverter.convert(savedBooking), HttpStatus.OK);
        } catch (TicketBuyingException ticketBuyingException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ticketBuyingException.getMessage(), ticketBuyingException);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<BookingCalendarDto>> getAllMyBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        return new ResponseEntity<>(bookingService.getMyBookings(user.getIdentificationString()), HttpStatus.OK);
    }
}
