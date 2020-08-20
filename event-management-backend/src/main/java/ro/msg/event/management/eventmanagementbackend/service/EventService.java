package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.EventSublocation;
import ro.msg.event.management.eventmanagementbackend.entity.Sublocation;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final SublocationRepository sublocationRepository;
    private final PictureRepository pictureRepository;
    private final TicketCategoryService ticketCategoryService;
    private final EventSublocationRepository eventSublocationRepository;
    private final LocationRepository locationRepository;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private final EntityManager entityManager;

    @Transactional
    public Event saveEvent(Event event, List<Long> sublocationIDs) throws OverlappingEventsException, ExceededCapacityException {

        LocalDate startDate = event.getStartDate();
        LocalDate endDate = event.getEndDate();
        LocalTime startHour = event.getStartHour();
        LocalTime endHour = event.getEndHour();

        TimeValidation.validateTime(startDate, endDate, startHour, endHour);

        boolean validSublocations = true;
        int sumCapacity = 0;
        for (Long l : sublocationIDs) {
            if (!checkOverlappingEvents(startDate, endDate, startHour, endHour, l)) {
                validSublocations = false;
            }
            sumCapacity += sublocationRepository.getOne(l).getMaxCapacity();
        }

        if (validSublocations && sumCapacity >= event.getMaxPeople()) {
            Event savedEvent = eventRepository.save(event);
            List<EventSublocation> eventSublocations = new ArrayList<>();
            sublocationIDs.forEach(sublocationID -> {
                EventSublocationID esID = new EventSublocationID(event.getId(), sublocationID);
                EventSublocation eventSublocation = new EventSublocation();
                eventSublocation.setEventSublocationID(esID);
                eventSublocation.setEvent(event);
                eventSublocation.setSublocation(this.sublocationRepository.findById(sublocationID).orElseThrow(() -> {
                    throw new NoSuchElementException("No sublocation with id=" + sublocationID);
                }));
                eventSublocations.add(eventSublocation);
            });
            event.setEventSublocations(eventSublocations);
            ticketCategoryService.saveTicketCategories(savedEvent.getTicketCategories(), savedEvent);
            return savedEvent;
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
    public Event updateEvent(Event event, List<Long> ticketCategoryToDelete, Long updatedLocation) throws OverlappingEventsException, ExceededCapacityException {
        Optional<Event> eventOptional;
        eventOptional = eventRepository.findById(event.getId());
        for (Long ticketCategoryId : ticketCategoryToDelete) {
            this.ticketCategoryService.deleteTicketCategory(ticketCategoryId);
        }

        if (eventOptional.isPresent()) {
            this.pictureRepository.deleteByEvent(eventOptional.get());
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
                    eventFromDB.setTicketsPerUser(event.getTicketsPerUser());
                    eventFromDB.setObservations(event.getObservations());
                    eventFromDB.getPictures().addAll(event.getPictures());

                    this.eventSublocationRepository.deleteByEvent(eventFromDB);

                    List<EventSublocation> eventSublocations = new ArrayList<>();
                    Location location = this.locationRepository.findById(updatedLocation)
                            .orElseThrow(() -> {
                                throw new NoSuchElementException("No location with id=" + updatedLocation);
                            });

                    for (Long sublocationID : location.getSublocation().stream().map(BaseEntity::getId).collect(Collectors.toList())) {
                        EventSublocationID esID = new EventSublocationID(event.getId(), sublocationID);
                        EventSublocation eventSublocation = new EventSublocation();
                        eventSublocation.setEventSublocationID(esID);
                        eventSublocation.setEvent(eventFromDB);
                        eventSublocation.setSublocation(this.sublocationRepository.findById(sublocationID).orElseThrow(() -> {
                            throw new NoSuchElementException("No sublocation with id=" + sublocationID);
                        }));
                        eventSublocations.add(eventSublocation);
                    }

                    eventFromDB.getEventSublocations().clear();
                    eventSublocations.forEach(eventSublocation -> eventFromDB.getEventSublocations().add(eventSublocation));

                    List<TicketCategory> categoriesToSave = new ArrayList<>();
                    event.getTicketCategories().forEach(ticketCategory ->
                    {
                        if (ticketCategory.getId() == -1) {
                            categoriesToSave.add(ticketCategory);
                        } else {
                            this.ticketCategoryService.updateTicketCategory(ticketCategory);
                        }
                    });

                    this.ticketCategoryService.saveTicketCategories(categoriesToSave, eventFromDB);

                    return eventFromDB;

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

    public TypedQuery<EventView> filter(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, SortCriteria sortCriteria, Boolean sortType) {

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<EventView> q = criteriaBuilder.createQuery(EventView.class);
        Root<EventView> c = q.from(EventView.class);
        List<Predicate> predicate = new ArrayList<>();
        if (title != null) {
            Expression<String> path = c.get("title");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + title.toUpperCase() + "%"));
        }
        if (subtitle != null) {
            Expression<String> path = c.get("subtitle");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + subtitle.toUpperCase() + "%"));
        }
        if (status != null) {
            predicate.add(criteriaBuilder.equal(c.get("status"), status));
        }

        if (highlighted != null) {
            predicate.add(criteriaBuilder.equal(c.get("highlighted"), highlighted));
        }

        if (location != null) {
            Expression<String> path = c.get("location");
            Expression<String> upper = criteriaBuilder.upper(path);
            predicate.add(criteriaBuilder.like(upper, "%" + location.toUpperCase() + "%"));
        }

        if (startDate != null && endDate != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startDate"), startDate, endDate);
            Predicate secondCase = criteriaBuilder.between(c.get("endDate"), startDate, endDate);
            Predicate thirdCase = criteriaBuilder.greaterThan(c.get("endDate"), endDate);
            Predicate fourthCase = criteriaBuilder.lessThan(c.get("startDate"), startDate);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));

        }
        if (startHour != null && endHour != null) {
            Predicate firstCase = criteriaBuilder.between(c.get("startHour"), startHour, endHour);
            Predicate secondCase = criteriaBuilder.between(c.get("endHour"), startHour, endHour);
            Predicate thirdCase = criteriaBuilder.greaterThan(c.get("endHour"), endHour);
            Predicate fourthCase = criteriaBuilder.lessThan(c.get("startHour"), startHour);
            Predicate fifthCase = criteriaBuilder.and(thirdCase, fourthCase);
            predicate.add(criteriaBuilder.or(firstCase, secondCase, fifthCase));
        }

        if (maxPeople != null) {
            predicate.add(this.getPredicate(maxPeopleSign, "maxPeople", (float) maxPeople, criteriaBuilder, c));
        }

        if (rateSign != null) {
            predicate.add(this.getPredicate(rateSign, "rate", rate, criteriaBuilder, c));
        }
        Predicate finalPredicate = criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        q.where(finalPredicate);
        String criteria = null;
        if (sortCriteria != null) {
            switch (sortCriteria) {
                case DATE:
                    criteria = "startDate";
                    break;
                case HOUR:
                    criteria = "startHour";
                    break;
                case OCCUPANCY_RATE:
                    criteria = "rate";
                    break;
                default:
                    break;
            }
        }
        if (sortType != null) {
            if (sortType == true) q.orderBy(criteriaBuilder.asc(c.get(criteria)));
            else q.orderBy(criteriaBuilder.desc(c.get(criteria)));
        }
        return entityManager.createQuery(q);

    }

    public List<EventView> filterAndPaginate(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int pageNumber, int eventPerPage, SortCriteria sortCriteria, Boolean sortType) {
        TypedQuery<EventView> typedQuery = this.filter(title, subtitle, status, highlighted, location, startDate, endDate, startHour, endHour, rateSign, rate, maxPeopleSign, maxPeople, sortCriteria, sortType);
        int offset = (pageNumber - 1) * eventPerPage;
        typedQuery.setFirstResult(offset);
        typedQuery.setMaxResults(eventPerPage);
        return typedQuery.getResultList();

    }

    public Predicate getPredicate(ComparisonSign comparisonSign, String criteria, Float value, CriteriaBuilder criteriaBuilder, Root<EventView> c) {
        switch (comparisonSign) {
            case GREATER:
                return criteriaBuilder.gt(c.get(criteria), value);
            case LOWER:
                return criteriaBuilder.le(c.get(criteria), value);
            case EQUAL:
                return criteriaBuilder.equal(c.get(criteria), value);
            default:
                return null;
        }
    }

    public int getNumberOfPages(String title, String subtitle, Boolean status, Boolean highlighted, String location, LocalDate startDate, LocalDate endDate, LocalTime startHour, LocalTime endHour, ComparisonSign rateSign, Float rate, ComparisonSign maxPeopleSign, Integer maxPeople, int eventPerPage) {
        int count = filter(title, subtitle, status, highlighted, location, startDate, endDate, startHour, endHour, rateSign, rate, maxPeopleSign, maxPeople, null, null).getResultList().size();
        return (int) Math.ceil((float) count / (float) eventPerPage);
    }

    public Event getEvent(long id) {
        Optional<Event> eventOptional = this.eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            return eventOptional.get();
        } else {
            throw new NoSuchElementException("No event with id= " + id);
        }
    }
}
