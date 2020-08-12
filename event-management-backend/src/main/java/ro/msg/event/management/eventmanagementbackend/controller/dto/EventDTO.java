package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {

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

    private List<String> pictureURL;

    private List<Long> subLocation;
}
