package ro.msg.event.management.eventmanagementbackend.entity;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TicketCategory extends BaseEntity {

    private String title;

    private String subtitle;

    private double price;

    private String description;

    private int ticketsPerCategory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event")
    private Event event;

    @OneToMany(mappedBy = "ticketCategory",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Ticket> tickets;
}
