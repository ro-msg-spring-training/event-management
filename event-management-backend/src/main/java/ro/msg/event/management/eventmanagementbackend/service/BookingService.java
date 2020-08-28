package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.exception.TicketBuyingException;
import ro.msg.event.management.eventmanagementbackend.repository.BookingRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketDocumentRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@ConfigurationProperties(
        prefix = "event-management.s3.tickets"
)
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withCredentials(new InstanceProfileCredentialsProvider(false))
            .withRegion(Regions.EU_WEST_1)
            .build();

    @Getter
    @Setter
    private String bucketName;

    private final TicketDocumentRepository ticketDocumentRepository;
    private final TicketCategoryRepository ticketCategoryRepository;

    public TicketCategory validateAndReturnTicketCategory(Event event, Map.Entry<String, List<Ticket>> categoryWithTickets) {
        List<TicketCategory> ticketCategories = this.ticketCategoryRepository.findByEvent(event);
        TicketCategory ticketCategory = ticketCategories.stream()
                .filter(category -> category.getTitle().equals(categoryWithTickets.getKey()))
                .findFirst()
                .orElseThrow(() -> {
                    throw new NoSuchElementException("No ticket category with title=" + categoryWithTickets.getKey());
                });

        long numberOfExistingTicketsForCategory = ticketCategory.getTickets().size();
        if (numberOfExistingTicketsForCategory + categoryWithTickets.getValue().size() > ticketCategory.getTicketsPerCategory()) {
            throw new TicketBuyingException("Number of tickets per category exceeds the maximum value!");
        }
        return ticketCategory;
    }

    @Transactional(rollbackFor = {FileNotFoundException.class, DocumentException.class})
    public Booking saveBookingAndTicketDocument(Booking booking, Map<String, List<Ticket>> categoryTitlesWithTickets, long eventId) throws IOException, DocumentException {
        Booking savedBooking = this.saveBooking(booking, categoryTitlesWithTickets, eventId);
        this.createAndSaveTicketDocument(savedBooking);
        return savedBooking;
    }

    @Transactional
    public Booking saveBooking(Booking booking, Map<String, List<Ticket>> categoryTitlesWithTickets, long eventId) {
        Optional<Event> eventOptional = this.eventRepository.findById(eventId);
        if (eventOptional.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + eventId);
        }
        Event event = eventOptional.get();

        long numberOfTicketsToPurchase = categoryTitlesWithTickets.values().stream().mapToInt(List::size).sum();

        //each user can buy only a certain amount of tickets at an event
        long totalNumberOfExistingTicketsForUserAtEvent = this.bookingRepository.findByUserAndEvent(booking.getUser(), event).stream()
                .mapToLong(booking1 -> booking1.getTickets().size())
                .sum();
        if (totalNumberOfExistingTicketsForUserAtEvent + numberOfTicketsToPurchase > event.getTicketsPerUser()) {
            throw new TicketBuyingException("Number of tickets exceeds maximum number of tickets per user!");
        }

        //each ticket category has a certain amount of tickets that cannot be exceeded
        List<Ticket> ticketsToSave = new ArrayList<>();
        for (Map.Entry<String, List<Ticket>> entry : categoryTitlesWithTickets.entrySet()) {
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

    public void createAndSaveTicketDocument(Booking savedBooking) throws IOException, DocumentException {
        Event event = savedBooking.getEvent();
        Location location = event.getEventSublocations().get(0).getSublocation().getLocation();

        for (Ticket ticket : savedBooking.getTickets()) {
            TicketCategory ticketCategory = ticket.getTicketCategory();

            PdfReader pdfReader = new PdfReader("template.pdf");
            String fileName = ticket.getId() + ".pdf";
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            PdfStamper pdfStamper = new PdfStamper(pdfReader, fileOutputStream);
            AcroFields acroFields = pdfStamper.getAcroFields();
            PdfContentByte pdfContentByte = pdfStamper.getOverContent(1);

            acroFields.setField("eventName", event.getTitle());
            acroFields.setField("location", location.getName() + " " + location.getAddress());
            if(event.getStartDate().isEqual(event.getEndDate()))
            {
                acroFields.setField("date", event.getStartDate() + "");
            }
            else
            {
                acroFields.setField("date", event.getStartDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")) + " - " + event.getEndDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")));
            }
            acroFields.setField("hour", event.getStartHour() + "");
            acroFields.setField("participantName", ticket.getName());
            acroFields.setField("ticketCategory", ticketCategory.getTitle());
            acroFields.setField("ticketCategoryDescription", ticketCategory.getDescription());

            Image image = Image.getInstance(new URL("https://event-management-pictures.s3-eu-west-1.amazonaws.com/image-135725-1597848333216-tr30-June-Ibiza.jpg"));
            this.replaceFieldWithImage(acroFields, pdfContentByte, "image", image);

            BarcodeQRCode qrCode = new BarcodeQRCode(savedBooking.getUser() + " " + ticket.getId().toString(), 1, 1, null);
            Image qrCodeImage = qrCode.getImage();
            qrCodeImage.scalePercent(300);
            this.replaceFieldWithImage(acroFields, pdfContentByte, "qrCode", qrCodeImage);

            Paragraph eventTicketInfoParagraph = new Paragraph(event.getTicketInfo());
            this.replaceFieldWithParagraph(acroFields, pdfContentByte, "eventTicketInfo", eventTicketInfoParagraph);

            pdfStamper.setFormFlattening(true);
            pdfStamper.close();

            File file = new File(fileName);
            String ticketUrl = this.saveDocumentToS3(file, fileName);
            this.saveTicketDocument(ticketUrl, ticket);
            boolean fileDeletedFromLocalStorage = file.delete();
            if (!fileDeletedFromLocalStorage) {
                throw new IOException("Temporary local pdf could not be deleted!");
            }
        }
    }

    private void saveTicketDocument(String ticketUrl, Ticket ticket) {
        TicketDocument ticketDocument = new TicketDocument();
        ticketDocument.setPdfUrl(ticketUrl);
        ticketDocument.setTicket(ticket);
        ticketDocument.setValidate(false);
        this.ticketDocumentRepository.save(ticketDocument);
    }

    private void replaceFieldWithImage(AcroFields acroFields, PdfContentByte pdfContentByte, String fieldName, Image image) throws DocumentException {
        if (acroFields.getFieldPositions(fieldName) != null) {
            Rectangle rectangle = acroFields.getFieldPositions(fieldName).get(0).position;
            acroFields.removeField(fieldName);
            image.scaleAbsolute(rectangle.getRight() - rectangle.getLeft(), rectangle.getTop() - rectangle.getBottom());
            image.setAbsolutePosition(rectangle.getLeft(), rectangle.getBottom());
            pdfContentByte.addImage(image);
        }
    }

    private void replaceFieldWithParagraph(AcroFields acroFields, PdfContentByte pdfContentByte, String fieldName, Paragraph paragraph) throws DocumentException {
        if (acroFields.getFieldPositions(fieldName) != null) {
            Rectangle rectangle = acroFields.getFieldPositions(fieldName).get(0).position;
            acroFields.removeField(fieldName);
            ColumnText columnText = new ColumnText(pdfContentByte);
            columnText.setSimpleColumn(rectangle);
            columnText.addElement(paragraph);
            columnText.go();
        }
    }

    public String saveDocumentToS3(File file, String fileName) {


        final PutObjectRequest putObjectRequest = new PutObjectRequest(this.bucketName, fileName, file);
        s3Client.putObject(putObjectRequest);
        return s3Client.getUrl(this.bucketName, fileName).toString();
    }
}
