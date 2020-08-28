package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService ticketService;
    private final Converter<TicketView, TicketListingDto> convertToTicketDto;

    @GetMapping("/remaining/{id}")
    public ResponseEntity<List<AvailableTicketsPerCategory>> getAvailableTickets(@PathVariable Long id) {
        List<AvailableTicketsPerCategory> list = ticketService.getAvailableTickets(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<JSONObject> getFilteredTickets(Pageable pageable, @RequestParam(required = false) String title, @RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = ((User) auth.getPrincipal()).getIdentificationString();
        Page<TicketView> page = ticketService.filterTickets(pageable, user, title, startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null);
        JSONObject responseBody = new JSONObject();
        responseBody.put("tickets", convertToTicketDto.convertAll(page.getContent()));
        responseBody.put("noPages", page.getTotalPages());
        responseBody.put("more", !page.isLast());
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
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
