package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.SortCriteria;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViewDateComparator;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViewOccupancyRateComparator;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViweHourComparator;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.EventViewRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    private final EventViewRepository eventViewRepository;

    @PersistenceContext(type = PersistenceContextType.EXTENDED)
    private final EntityManager entityManager;

    public TypedQuery<EventView> filter(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDateTime startDate, LocalDateTime endDate, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<EventView> q = criteriaBuilder.createQuery(EventView.class);
        Root<EventView> c = q.from(EventView.class);
        List<Predicate> predicate = new ArrayList<Predicate>();
        if (title != null) {
            predicate.add(criteriaBuilder.equal(c.get("title"), title));
        }
        if (subtitle != null) {
            predicate.add(criteriaBuilder.equal(c.get("subtitle"), subtitle));
        }
        if (status != null) {
            predicate.add(criteriaBuilder.equal(c.get("status"), status));
        }

        if (highlighted != null) {
            predicate.add(criteriaBuilder.equal(c.get("highlighted"), highlighted));
        }

        if (location != null) {
            predicate.add(criteriaBuilder.equal(c.get("location"), location));
        }

        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            predicate.add(criteriaBuilder.or(firstCase, secondCase));

        }
        if (maxPeopleSign != null) {
            switch (maxPeopleSign) {
                case GREATER:
                    predicate.add(criteriaBuilder.gt(c.get("maxPeople"), maxPeople));
                    break;
                case LOWER:
                    predicate.add(criteriaBuilder.le(c.get("maxPeople"), maxPeople));
                    break;
                case EQUAL:
                    predicate.add(criteriaBuilder.equal(c.get("maxPeople"), maxPeople));
                    break;
            }
        }

        if (rateSign != null) {
            switch (rateSign) {
                case GREATER:
                    predicate.add(criteriaBuilder.gt(c.get("rate"), rate));
                    break;
                case LOWER:
                    predicate.add(criteriaBuilder.le(c.get("rate"), rate));
                    break;
                case EQUAL:
                    predicate.add(criteriaBuilder.equal(c.get("rate"), rate));
                    break;
            }
        }
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[predicate.size()]));
        q.where(finalPredicate);
        return entityManager.createQuery(q);
    }

    public List<EventView> filterAndPaginate(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDateTime startDate, LocalDateTime endDate, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage){
        TypedQuery<EventView> typedQuery = filter(title,subtitle,status,highlighted,location,startDate,endDate,rateSign,rate,maxPeopleSign,maxPeople);
        int offset = (pageNumber - 1) * eventPerPage;
        typedQuery.setFirstResult(offset);
        typedQuery.setMaxResults(eventPerPage);
        return typedQuery.getResultList();
    }

    public List<EventView> filterAndOrder(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDateTime startDate, LocalDateTime endDate, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage, SortCriteria sortCriteria, Boolean sortType){
        TypedQuery<EventView> typedQuery = filter(title,subtitle,status,highlighted,location,startDate,endDate,rateSign,rate,maxPeopleSign,maxPeople);
        List<EventView> eventViews = typedQuery.getResultList();
        switch (sortCriteria){
            case DATE:
                Collections.sort(eventViews,new EventViewDateComparator());
                break;
            case HOUR:
                Collections.sort(eventViews, new EventViweHourComparator());
                break;
            case OCCUPANCY_RATE:
                Collections.sort(eventViews,new EventViewOccupancyRateComparator());
                break;
            default: break;
        }
        if (sortType == false){
            Collections.reverse(eventViews);
        }
        int offset = (pageNumber - 1) * eventPerPage;
        return eventViews.subList(offset,offset+eventPerPage);
    }

    public int getNumberOfPages(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDateTime startDate, LocalDateTime endDate, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage) {
        int count = filter(title, subtitle, status, highlighted, location, startDate, endDate, rateSign, rate, maxPeopleSign, maxPeople).getResultList().size();
        return count / eventPerPage;
    }

}
