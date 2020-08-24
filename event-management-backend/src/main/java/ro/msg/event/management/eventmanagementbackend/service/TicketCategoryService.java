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
            if (ticketCategory.getTickets() == null) {
                return true;
            }
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
        if (this.checkIfNoTicketsForCategory(id)) {
            TicketCategory ticketCategory = ticketCategoryOptional.get();
            Event event = ticketCategory.getEvent();
            event.getTicketCategories().remove(ticketCategory);
            this.ticketCategoryRepository.deleteById((id));
        } else {
            throw new TicketCategoryException("Ticket category cannot be deleted! There are tickets belonging to this category.");
        }
    }

    @Transactional
    public TicketCategory updateTicketCategory(TicketCategory update) {
        Optional<TicketCategory> ticketCategoryOptional = this.ticketCategoryRepository.findById(update.getId());
        if (ticketCategoryOptional.isEmpty()) {
            throw new NoSuchElementException("No ticket category with id= " + update.getId());
        }

        TicketCategory ticketCategory = ticketCategoryOptional.get();
        long numberOfPurchasedTickets = ticketCategory.getTickets().size();
        if (update.getTicketsPerCategory() < numberOfPurchasedTickets) {
            throw new TicketCategoryException("Number of tickets per category cannot be smaller thant the number of purchased tickets!");
        }

        ticketCategory.setTicketsPerCategory(update.getTicketsPerCategory());
        ticketCategory.setDescription(update.getDescription());
        ticketCategory.setPrice(update.getPrice());
        ticketCategory.setSubtitle(update.getSubtitle());
        ticketCategory.setTitle(update.getTitle());

        long sumNumberOfTicketsPerCategory = 0;
        for (TicketCategory category : ticketCategory.getEvent().getTicketCategories()) {
            sumNumberOfTicketsPerCategory += category.getTicketsPerCategory();
        }
        if (sumNumberOfTicketsPerCategory > ticketCategory.getEvent().getMaxPeople()) {
            throw new TicketCategoryException("Sum of number of tickets per category exceeds the maximum number of people for the event!");
        }

        return this.ticketCategoryRepository.save(ticketCategory);
    }
}
