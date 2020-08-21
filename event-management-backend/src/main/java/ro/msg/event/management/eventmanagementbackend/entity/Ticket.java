package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ticket")
public class Ticket extends BaseEntity {

    private String name;

    private String emailAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking")
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_category")
    private TicketCategory ticketCategory;

    @OneToOne(mappedBy = "ticket",
            cascade = CascadeType.ALL,
            optional = true,
            fetch = FetchType.LAZY)
    private TicketDocument ticketDocument;
}
