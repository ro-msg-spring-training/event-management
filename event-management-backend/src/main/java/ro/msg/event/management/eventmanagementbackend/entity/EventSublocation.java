package ro.msg.event.management.eventmanagementbackend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ro.msg.event.management.eventmanagementbackend.embeddedid.EventSublocationID;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EventSublocation {

    @AttributeOverrides({
            @AttributeOverride(name = "event", column = @Column(name = "event")),
            @AttributeOverride(name = "sublocation", column = @Column(name = "sublocation"))
    })

    @EmbeddedId
    private EventSublocationID eventSublocationID;

    @MapsId(value = "event")
    @ManyToOne
    private Event event;

    @MapsId(value = "sublocation")
    @ManyToOne
    private Sublocation sublocation;

    public EventSublocation(Event event, Sublocation sublocation){
        this.event = event;
        this.sublocation= sublocation;
    }

}
