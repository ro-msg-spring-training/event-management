package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory,Long> {
}
