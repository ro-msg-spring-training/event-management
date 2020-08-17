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
public class Ticket extends BaseEntity {

    private String name;

    private String emailAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking")
    private Booking booking;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ticket")
    private TicketDocument ticketDocument;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticketCategory")
    private TicketCategory ticketCategory;
}
