package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking extends BaseEntity {

    private LocalDateTime bookingDate;

    private Long user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event")
    private Long event;

    @OneToMany(mappedBy = "booking",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    private List<Ticket> tickets;
}
