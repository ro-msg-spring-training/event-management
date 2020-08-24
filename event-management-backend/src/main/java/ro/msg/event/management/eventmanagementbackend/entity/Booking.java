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
@Builder
public class Booking extends BaseEntity {

    private LocalDateTime bookingDate;

    private String user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event")
    private Event event;

    @OneToMany(mappedBy = "booking",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Ticket> tickets;
}
