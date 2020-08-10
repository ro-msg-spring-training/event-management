package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.msg.event.management.eventmanagementbackend.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {
}
