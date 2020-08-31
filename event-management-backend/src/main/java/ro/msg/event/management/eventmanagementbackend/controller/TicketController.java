package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCorrespondingEventException;
import ro.msg.event.management.eventmanagementbackend.exception.TicketValidateException;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

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


    @PatchMapping("/validate/{idTicket}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<JSONObject> validateTicket(@RequestParam long idEvent, @PathVariable Long idTicket) {
        String participantName;
        String participantEmail;
        try {
            Ticket ticket = ticketService.validateTicket(idEvent, idTicket);
            participantName = ticket.getName();
            participantEmail = ticket.getEmailAddress();
        } catch (TicketValidateException ticketValidateException) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ticketValidateException.getMessage(), ticketValidateException);
        } catch (TicketCorrespondingEventException ticketCorrespondingEventException) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, ticketCorrespondingEventException.getMessage(), ticketCorrespondingEventException);
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }

        JSONObject responseBody = new JSONObject();
        responseBody.put("name", participantName);
        responseBody.put("email", participantEmail);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }
}
