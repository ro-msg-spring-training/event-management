package ro.msg.event.management.eventmanagementbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.msg.event.management.eventmanagementbackend.entity.AvailableTicketsPerCategory;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTicketCategory(long ticketCategoryId);
    @Query("select new ro.msg.event.management.eventmanagementbackend.entity.AvailableTicketsPerCategory(c.title, c.ticketsPerCategory - COUNT(*))"+
            " FROM TicketCategory as c INNER JOIN Ticket t "+
            "ON c.id = t.ticketCategory"+
            " GROUP BY t.ticketCategory HAVING c.event.id = :id"
    )
    List<AvailableTicketsPerCategory> getAvailableTicketsForEvent(@Param("id")Long id);
}
