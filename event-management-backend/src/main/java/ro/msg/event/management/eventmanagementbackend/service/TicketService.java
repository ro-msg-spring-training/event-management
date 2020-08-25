package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.controller.dto.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.view.TicketView;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.security.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final EventRepository eventRepository;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    public List<AvailableTicketsPerCategory> getAvailableTickets(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isEmpty()) {
            throw new NoSuchElementException("There is no event with id " + id);
        }
        return event.get().getTicketCategories().stream().map(category -> new AvailableTicketsPerCategory(category.getTitle(), (long) category.getTickets().size(), (long) category.getTicketsPerCategory() - (long) category.getTickets().size())).collect(Collectors.toList());

    }

    public TypedQuery<TicketView> filterTickets(String title, LocalDate startDate, LocalDate endDate) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<TicketView> q = criteriaBuilder.createQuery(TicketView.class);
        Root<TicketView> c = q.from(TicketView.class);
        List<Predicate> predicate = new ArrayList<>();
        if (title != null) {
            Expression<String> path = c.get("event_title");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + title.toUpperCase() + "%"));
        }
        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            Predicate thirdCase = criteriaBuilder.greaterThan(c.get("endDate"), endDate);
            Predicate fourthCase = criteriaBuilder.lessThan(c.get("startDate"), startDate);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user =((User)auth.getPrincipal()).getIdentificationString();
        predicate.add(criteriaBuilder.equal(c.get("user"), user));
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        return entityManager.createQuery(q);
    }

    public List<TicketView> getFilteredAndPaginated(String title, LocalDate startDate, LocalDate endDate, Integer pageNumber, Integer ticketsPerPage) {
        TypedQuery<TicketView> typedQuery = this.filterTickets(title, startDate, endDate);
        int offset = (pageNumber - 1) * ticketsPerPage;
        typedQuery.setFirstResult(offset);
        typedQuery.setMaxResults(ticketsPerPage);
        return typedQuery.getResultList();
    }

    public Integer getNumberOfPages(String title, LocalDate startDate, LocalDate endDate,Integer ticketsPerPage){
        int count = filterTickets(title,startDate,endDate).getResultList().size();
        return (int) Math.ceil((float) count / (float) ticketsPerPage);
    }

}
;