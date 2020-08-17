package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;
import ro.msg.event.management.eventmanagementbackend.exception.TicketCategoryException;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.TicketCategoryRepository;
import ro.msg.event.management.eventmanagementbackend.service.TicketCategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@SpringBootTest
class TicketCategoryCRUDIntegrationsTests {
    private final EventRepository eventRepository;
    private final TicketCategoryService ticketCategoryService;
    private final TicketCategoryRepository ticketCategoryRepository;

    @Autowired
    public TicketCategoryCRUDIntegrationsTests(TicketCategoryService ticketCategoryService, EventRepository eventRepository, TicketCategoryRepository ticketCategoryRepository) {
        this.ticketCategoryService = ticketCategoryService;
        this.eventRepository = eventRepository;
        this.ticketCategoryRepository = ticketCategoryRepository;
    }

    @BeforeEach
    void setUp() {
        this.eventRepository.deleteAll();
        this.eventRepository.deleteAll();
    }

    @Test
    @Transactional
    void saveTicketCategories_validCategories_categoriesSaved() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        this.eventRepository.save(event);

        this.ticketCategoryService.saveTicketCategories(ticketCategories, event);

        assert this.ticketCategoryRepository.findAll().size() == 2;
        assert this.eventRepository.findById(this.eventRepository.findAll().get(0).getId()).get().getTicketCategories().size() == 2;
    }

    @Test
    void saveTicketCategories_sumOfTicketsPerCategoryExceedsPeopleAtEvent_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(15);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        this.eventRepository.save(event);

        try {
            this.ticketCategoryService.saveTicketCategories(ticketCategories, event);
            assert false;
        } catch (TicketCategoryException ticketCategoryException) {
            assert true;
        }
    }

    @Test
    @Transactional
    void deleteTicketCategory_existingTicketCategory_ticketCategoryDeleted() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        long countBefore = this.ticketCategoryRepository.count();
        this.ticketCategoryService.deleteTicketCategory(this.ticketCategoryRepository.findAll().get(0).getId());
        assert this.ticketCategoryRepository.count() == countBefore - 1;
        assert this.eventRepository.findById(this.eventRepository.findAll().get(0).getId()).get().getTicketCategories().size() == 1;
    }

    @Test
    void deleteTicketCategory_noTicketCategoryWithSuchId_exceptionThrown() {
        Event event = new Event();
        event.setMaxPeople(40);

        TicketCategory ticketCategory1 = new TicketCategory();
        ticketCategory1.setTicketsPerCategory(10);
        ticketCategory1.setEvent(event);
        TicketCategory ticketCategory2 = new TicketCategory();
        ticketCategory2.setTicketsPerCategory(10);
        ticketCategory2.setEvent(event);

        List<TicketCategory> ticketCategories = new ArrayList<>();
        ticketCategories.add(ticketCategory1);
        ticketCategories.add(ticketCategory2);

        event.setTicketCategories(ticketCategories);
        this.eventRepository.save(event);

        try {
            this.ticketCategoryService.deleteTicketCategory((long) -2);
            assert false;
        } catch (NoSuchElementException noSuchElementException) {
            assert true;
        }

        try {
            this.ticketCategoryService.deleteTicketCategory((long) 100);
            assert false;
        } catch (NoSuchElementException noSuchElementException) {
            assert true;
        }
    }
}
