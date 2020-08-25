package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketListingDto;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.TicketService;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tickets")
public class TicketController {

    private static final int TICKETS_PER_PAGE = 5;
    private final TicketService ticketService;
    private final Converter<TicketView, TicketListingDto> convertToTicketDto;

    @GetMapping("/remaining/{id}")
    public ResponseEntity<AvailableTicketsPerCategory> getAvailableTickets(@PathVariable Long id){
        List<AvailableTicketsPerCategory> list = ticketService.getAvailableTickets(id);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/filter/{pageNumber}")
    public ResponseEntity<TicketView> getFilteredTickets(@PathVariable Integer pageNumber, @RequestParam(required = false) String title, @RequestParam(required = false) String startDate, @RequestParam(required = false)String endDate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user =((User)auth.getPrincipal()).getIdentificationString();
        List<TicketView> ticketViews =  ticketService.getFilteredAndPaginated(user,title,startDate != null ? LocalDate.parse(startDate) : null, endDate != null ? LocalDate.parse(endDate) : null, pageNumber,TICKETS_PER_PAGE);
       return new ResponseEntity(convertToTicketDto.convertAll(ticketViews), HttpStatus.OK);
    }

    @GetMapping("filter/lastPage")
    public Integer getNumberOfPages(@RequestParam(required = false) String title, @RequestParam(required = false) String startDate, @RequestParam(required = false)String endDate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user =((User)auth.getPrincipal()).getIdentificationString();
        return ticketService.getNumberOfPages(user,title,startDate != null ? LocalDate.parse(startDate) : null,endDate != null ? LocalDate.parse(endDate) : null,TICKETS_PER_PAGE);
    }
}
