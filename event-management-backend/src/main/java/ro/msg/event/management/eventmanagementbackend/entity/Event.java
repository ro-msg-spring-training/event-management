package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "event")
public class Event extends BaseEntity {

    private String title;

    private String subtitle;

    private boolean status;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime endHour;

    private LocalTime startHour;

    private int maxPeople;

    private String description;

    private boolean highlighted;

    private String observations;

    private int ticketsPerUser;

    private String creator;


    @OneToMany(mappedBy = "event",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Picture> pictures;


    @OneToMany(mappedBy = "event",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<EventSublocation> eventSublocations;


    @OneToMany(mappedBy = "event",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "event",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<TicketCategory> ticketCategories;

}
