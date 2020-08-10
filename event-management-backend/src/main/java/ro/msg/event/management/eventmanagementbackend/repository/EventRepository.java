package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

public interface EventRepository extends JpaRepository<Event,Long> {
    Event findByTitle(String title);
    Event findBySubtitle(String subtitle);
    Event findByStatus(Boolean status);
    Event findByHighlighted(Boolean highlighted);

}
