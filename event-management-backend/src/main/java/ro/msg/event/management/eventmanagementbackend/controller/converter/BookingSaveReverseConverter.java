package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.BookingSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Booking;

@Component
public class BookingSaveReverseConverter implements Converter<BookingSaveDto, Booking> {

    @Override
    public Booking convert(BookingSaveDto bookingSaveDto) {
        Booking booking = Booking.builder()
                .bookingDate(bookingSaveDto.getBookingDate())
                .build();

        /*List<Ticket> tickets = new ArrayList<>();
        bookingSaveDto.getTickets().forEach(ticketAddDto ->
        {
            Ticket ticket = Ticket.builder()
                    .emailAddress(bookingSaveDto.getEmail())
                    .name(ticketAddDto.getName())
                    .booking(booking)
                    .build();
            tickets.add(ticket);
        });
        booking.setTickets(tickets);*/
        return booking;
    }
}
