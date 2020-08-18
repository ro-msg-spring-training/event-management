package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViewDateComparator;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViewHourComparator;
import ro.msg.event.management.eventmanagementbackend.comparator.EventViewOccupancyRateComparator;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.repository.EventRepository;
import ro.msg.event.management.eventmanagementbackend.repository.PictureRepository;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;
import ro.msg.event.management.eventmanagementbackend.utils.SortCriteria;
import ro.msg.event.management.eventmanagementbackend.utils.TimeValidation;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final SublocationRepository sublocationRepository;
    private final PictureRepository pictureRepository;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    public long saveEvent(Event event, List<Long> sublocations) throws OverlappingEventsException, ExceededCapacityException {

        LocalDate startDate = event.getStartDate();
        LocalDate endDate = event.getEndDate();
        LocalTime startHour = event.getStartHour();
        LocalTime endHour = event.getEndHour();

        TimeValidation.validateTime(startDate, endDate, startHour, endHour);

        boolean validSublocations = true;
        int sumCapacity = 0;
        for (Long l : sublocations) {
            if (!checkOverlappingEvents(startDate, endDate, startHour, endHour, l)) {
                validSublocations = false;
            }
            sumCapacity += sublocationRepository.getOne(l).getMaxCapacity();
        }

        if (validSublocations && sumCapacity >= event.getMaxPeople()) {
            return eventRepository.save(event).getId();
        } else if (!validSublocations) {
            throw new OverlappingEventsException("Event overlaps another scheduled event");
        } else {
            throw new ExceededCapacityException("MaxPeople exceeds capacity of sublocations");
        }
    }

    public boolean checkOverlappingEvents(LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, long sublocation) {
        List<Event> overlappingEvents = eventRepository.findOverlappingEvents(startDate, endDate, startHour, endHour, sublocation);
        return overlappingEvents.isEmpty();
    }

    @Transactional
    public Event updateEvent(Event event, List<String> picturesUrlDelete) throws OverlappingEventsException, ExceededCapacityException {
        Optional<Event> eventOptional;
        eventOptional = eventRepository.findById(event.getId());

        for(String url : picturesUrlDelete)
        {
            pictureRepository.deleteByUrl(url);
        }

        if (eventOptional.isPresent()) {
            Event eventFromDB = eventOptional.get();

            LocalDate startDate = event.getStartDate();
            LocalDate endDate = event.getEndDate();
            LocalTime startHour = event.getStartHour();
            LocalTime endHour = event.getEndHour();

            TimeValidation.validateTime(startDate, endDate, startHour, endHour);

            boolean validSublocation = true;
            int sumCapacity = 0;

            List<Long> sublocationsId = eventFromDB.getEventSublocations()
                    .stream()
                    .map(EventSublocation::getSublocation)
                    .map(Sublocation::getId)
                    .collect(Collectors.toList());

            for (Long subId : sublocationsId) {
                if (!checkOverlappingEvents(eventFromDB.getId(), startDate, endDate, startHour, endHour, subId)) {
                    validSublocation = false;
                }
                sumCapacity += sublocationRepository.getOne(subId).getMaxCapacity();
            }

            if (validSublocation) {
                if (sumCapacity >= event.getMaxPeople()) {
                    eventFromDB.setStartDate(startDate);
                    eventFromDB.setEndDate(endDate);
                    eventFromDB.setStartHour(startHour);
                    eventFromDB.setEndHour(endHour);
                    eventFromDB.setTitle(event.getTitle());
                    eventFromDB.setSubtitle(event.getSubtitle());
                    eventFromDB.setDescription(event.getDescription());
                    eventFromDB.setMaxPeople(event.getMaxPeople());
                    eventFromDB.setCreator(event.getCreator());
                    eventFromDB.setHighlighted(event.isHighlighted());
                    eventFromDB.setStatus(event.isStatus());
                    eventFromDB.setNoTicketEvent(event.isNoTicketEvent());
                    eventFromDB.setObservations(event.getObservations());
                    eventFromDB.getPictures().addAll(event.getPictures());

                    return eventRepository.save(eventFromDB);

                } else throw new ExceededCapacityException("exceed capacity");
            } else throw new OverlappingEventsException("overlaps other events");

        } else
            throw new NoSuchElementException();
    }

    public boolean checkOverlappingEvents(Long eventID, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, long sublocation) {
        List<Event> foundEvents = eventRepository.findOverlappingEvents(startDate, endDate, startHour, endHour, sublocation);
        List<Event> overlapingEvents = foundEvents
                .stream()
                .filter(event -> !event.getId().equals(eventID))
                .collect(Collectors.toList());
        return overlapingEvents.isEmpty();
    }

    public void deleteEvent(long id) {
        Optional<Event> optionalEvent = this.eventRepository.findById(id);
        if (optionalEvent.isEmpty()) {
            throw new NoSuchElementException("No event with id= " + id);
        }
        this.eventRepository.deleteById(id);
    }

    public TypedQuery<EventView> filter(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<EventView> q = criteriaBuilder.createQuery(EventView.class);
        Root<EventView> c = q.from(EventView.class);
        List<Predicate> predicate = new ArrayList<>();
        if (title != null) {
            Expression<String> path = c.get("title");
            Expression<String> upper =criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper,"%"+title.toUpperCase()+"%"));
        }
        if (subtitle != null) {
            Expression<String> path = c.get("subtitle");
            Expression<String> upper =criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper,"%"+subtitle.toUpperCase()+"%"));
        }
        if (status != null) {
            predicate.add(criteriaBuilder.equal(c.get("status"), status));
        }

        if (highlighted != null) {
            predicate.add(criteriaBuilder.equal(c.get("highlighted"), highlighted));
        }

        if (location != null) {
            Expression<String> path = c.get("location");
            Expression<String> upper =criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper,"%"+location.toUpperCase()+"%"));
        }

        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            predicate.add(criteriaBuilder.or(firstCase, secondCase));

        }
        if (startHour != null && endHour != null){
            Predicate firstCase = criteriaBuilder.between(c.get("startHour"), startHour, endHour);
            Predicate secondCase = criteriaBuilder.between(c.get("endHour"), startHour, endHour);
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
                default:
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
                default:
                    break;
            }
        }
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        return entityManager.createQuery(q);
    }

    public List<EventView> filterAndPaginate(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage) {
        if(pageNumber < 1)
        {
            throw new IndexOutOfBoundsException("Invalid page number");
        }
        TypedQuery<EventView> typedQuery = filter(title, subtitle, status, highlighted, location, startDate, endDate, startHour, endHour, rateSign, rate, maxPeopleSign, maxPeople);
        int offset = (pageNumber - 1) * eventPerPage;
        typedQuery.setFirstResult(offset);
        typedQuery.setMaxResults(eventPerPage);
        return typedQuery.getResultList();
    }

    public List<EventView> filterAndOrder(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage, SortCriteria sortCriteria, Boolean sortType) {
        if(pageNumber < 1)
        {
            throw new IndexOutOfBoundsException("Invalid page number");
        }
        TypedQuery<EventView> typedQuery = filter(title, subtitle, status, highlighted, location, startDate, endDate, startHour, endHour, rateSign, rate, maxPeopleSign, maxPeople);
        List<EventView> eventViews = typedQuery.getResultList();
        switch (sortCriteria) {
            case DATE:
                eventViews.sort(new EventViewDateComparator());
                break;
            case HOUR:
                eventViews.sort(new EventViewHourComparator());
                break;
            case OCCUPANCY_RATE:
                eventViews.sort(new EventViewOccupancyRateComparator());
                break;
            default:
                break;
        }
        if (!sortType) {
            Collections.reverse(eventViews);
        }
        int offset = (pageNumber - 1) * eventPerPage;
        if (offset + eventPerPage > eventViews.size()) {
            return eventViews.subList(offset, eventViews.size());
        }
        if (offset + eventPerPage+1 == eventViews.size() || pageNumber <0){
            return new ArrayList<>();
        }
        return eventViews.subList(offset, offset + eventPerPage);
    }

    public int getNumberOfPages(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int eventPerPage) {
        int count = filter(title, subtitle, status, highlighted, location, startDate, endDate, startHour, endHour, rateSign, rate, maxPeopleSign, maxPeople).getResultList().size();
        return (int)Math.ceil((float)count / (float)eventPerPage);
    }

    public Event getEvent(long id)
    {
        Optional<Event> eventOptional = this.eventRepository.findById(id);
        if(eventOptional.isPresent())
        {
            return eventOptional.get();
        }
        else
        {
            throw new NoSuchElementException("No event with id= " + id);
        }
    }
}
