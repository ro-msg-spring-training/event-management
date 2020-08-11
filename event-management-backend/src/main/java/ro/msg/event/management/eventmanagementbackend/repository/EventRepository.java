package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event,Long> {

    @Query("select e from Event e join EventSublocation es on e.id = es.event.id " +
            "where (e.startDate>= :start and e.startDate<= :end) " +
            "or (e.endDate<= :end and e.endDate>=:start)  and es.sublocation.id = :sublocation")
    List<Event> findOverlappingEvents(@Param("start") LocalDateTime start,
                                             @Param("end") LocalDateTime end,
                                             @Param("sublocation") long sublocation);

}
