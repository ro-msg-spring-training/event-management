package ro.msg.event.management.eventmanagementbackend.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BarcodeQRCode;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketRepository;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.*;
import java.util.List;

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

    @Transactional
    public void createPdf(Booking savedBooking) throws FileNotFoundException, DocumentException {
        Event event = savedBooking.getEvent();
        Location location =  event.getEventSublocations().get(0).getSublocation().getLocation();

        for(Ticket ticket : savedBooking.getTickets())
        {
            TicketCategory ticketCategory = ticket.getTicketCategory();
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("C:\\Users\\radus\\Desktop\\" + ticket.getId() + ".pdf"));
            document.open();

            Font headerFont = FontFactory.getFont(FontFactory.TIMES_BOLD, 17, BaseColor.BLACK);
            Font bodyFont = FontFactory.getFont(FontFactory.TIMES, 17, BaseColor.BLACK);

            String pdfHeaderString = "Event: " + event.getTitle() + "\n" +
                    "Location: " + location.getName() + " " + location.getAddress() + "\n" +
                    "Date and hour: " + event.getStartDate() + " " + event.getStartHour() + "\n\n";

            Paragraph headerParagraph = new Paragraph(pdfHeaderString, headerFont);
            document.add(headerParagraph);

            String pdfBodyString = "Name: " + ticket.getName() + "\n" +
                    "Ticket category: " + ticketCategory.getTitle() + "\n" +
                    "Ticket category description: " + ticketCategory.getDescription() + "\n" +
                    "Event ticket information: " + event.getTicketInfo();

            Paragraph bodyParagraph = new Paragraph(pdfBodyString, bodyFont);
            bodyParagraph.setSpacingAfter(200);
            document.add(bodyParagraph);

            BarcodeQRCode qrCode = new BarcodeQRCode(savedBooking.getUser() + " " + ticket.getId().toString(), 1, 1, null);
            Image qrCodeImage = qrCode.getImage();
            qrCodeImage.scalePercent(300);
            qrCodeImage.setAlignment(Element.ALIGN_CENTER);
            document.add(qrCodeImage);

            document.setPageSize(PageSize.A4);
            document.close();
        }
    }
}
