package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event extends BaseEntity {

    private String title;

    private String subtitle;

    private boolean status;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private int maxPeople;

    private String description;

    private boolean highlighted;

    private String observations;

    private boolean noTicketEvent;

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
}
