package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ro.msg.event.management.eventmanagementbackend.service.TicketCategoryService;

import java.util.NoSuchElementException;

@RestController
@AllArgsConstructor
@RequestMapping("/ticketCategories")
@CrossOrigin
public class TicketCategoryController {
    private final TicketCategoryService ticketCategoryService;

    @GetMapping("/check/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> checkIfNoTicketsForCategory(@PathVariable long id) {
        try {
            if (this.ticketCategoryService.checkIfNoTicketsForCategory(id)) {
                return new ResponseEntity<>("Ticket category can be deleted!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Ticket category cannot be deleted! There are tickets belonging to this category.", HttpStatus.CONFLICT);
            }
        } catch (NoSuchElementException noSuchElementException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, noSuchElementException.getMessage(), noSuchElementException);
        }

    }
}
