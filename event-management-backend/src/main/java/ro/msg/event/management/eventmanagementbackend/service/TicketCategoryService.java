package ro.msg.event.management.eventmanagementbackend.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCategoryException;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TicketCategoryService {
    private final TicketCategoryRepository ticketCategoryRepository;

    public boolean checkIfNoTicketsForCategory(long ticketCategoryId) {
        Optional<TicketCategory> ticketCategoryOptional = this.ticketCategoryRepository.findById(ticketCategoryId);
        if (ticketCategoryOptional.isEmpty()) {
            throw new NoSuchElementException("No ticket category with id= " + ticketCategoryId);
        } else {
            TicketCategory ticketCategory = ticketCategoryOptional.get();
            return ticketCategory.getTickets().isEmpty();
        }
    }

    @Transactional
    public List<TicketCategory> saveTicketCategories(List<TicketCategory> ticketCategories, Event event) {
        List<TicketCategory> savedCategories = new ArrayList<>();
        long sumNumberOfTicketsPerCategory = 0;
        for (TicketCategory ticketCategory : ticketCategories) {
            ticketCategory.setEvent(event);
            sumNumberOfTicketsPerCategory += ticketCategory.getTicketsPerCategory();
            savedCategories.add(this.ticketCategoryRepository.save(ticketCategory));
        }
        if (sumNumberOfTicketsPerCategory > event.getMaxPeople()) {
            throw new TicketCategoryException("Sum of number of tickets per category exceeds the maximum number of people for the event!");
        }
        return savedCategories;
    }

    public void deleteTicketCategory(long id) {
        Optional<TicketCategory> ticketCategoryOptional = this.ticketCategoryRepository.findById(id);
        if (ticketCategoryOptional.isEmpty()) {
            throw new NoSuchElementException("No ticket category with id= " + id);
        }
        TicketCategory ticketCategory = ticketCategoryOptional.get();
        Event event = ticketCategory.getEvent();
        event.getTicketCategories().remove(ticketCategory);
        this.ticketCategoryRepository.deleteById((id));
    }
}
