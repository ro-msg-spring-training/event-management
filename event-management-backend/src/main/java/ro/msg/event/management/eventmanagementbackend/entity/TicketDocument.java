package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TicketDocument extends BaseEntity {

    private String pdfUrl;

    private boolean validate;

    @OneToOne
    @MapsId
    private Ticket ticket;
}
