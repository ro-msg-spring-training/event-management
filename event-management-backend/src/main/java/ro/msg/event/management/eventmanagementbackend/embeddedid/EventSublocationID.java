package ro.msg.event.management.eventmanagementbackend.embeddedid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventSublocationID implements Serializable {

    @Column
    private long event;

    @Column
    private long sublocation;

}
