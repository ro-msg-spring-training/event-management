package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event.management.eventmanagementbackend.entity.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select e from Event e join EventSublocation es on e.id = es.event.id " +
            "where (e.startDate>= :startDate and e.startDate<= :endDate and e.startHour >= :startHour and e.startHour <= :endHour) " +
            "or (e.endDate <= :endDate and e.endDate >= :startDate and e.endHour <= :endHour and e.endHour >= :startHour)" +
            " and es.sublocation.id = :sublocation")
    List<Event> findOverlappingEvents(@Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate,
                                      @Param("startHour") LocalTime startHour,
                                      @Param("endHour") LocalTime endHour,
                                      @Param("sublocation") long sublocation);

}
