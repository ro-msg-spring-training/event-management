package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;

import java.io.InputStream;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
public class TicketController {
    private final TicketService ticketService;

    @GetMapping("/remaining/{id}")
    public ResponseEntity<AvailableTicketsPerCategory> getAvailableTickets(@PathVariable Long id){
        List<AvailableTicketsPerCategory> list = ticketService.getAvailableTickets(id);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping(value = "/pdf/{id}", produces = "application/pdf")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<InputStreamResource> getTicketPdf(@PathVariable long id)
    {
        InputStream pdfInputStream = this.ticketService.getPdf(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Content-Disposition", "filename= ticket.pdf");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return new ResponseEntity<>(new InputStreamResource(pdfInputStream), headers, HttpStatus.OK);
    }
}
