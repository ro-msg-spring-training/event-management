package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

import java.util.List;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory,Long> {
    List<TicketCategory> findByEvent(Event event);
}
