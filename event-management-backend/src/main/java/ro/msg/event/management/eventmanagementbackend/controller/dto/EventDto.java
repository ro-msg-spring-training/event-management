package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {

    private String title;

    private String subtitle;

    private boolean status;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime startHour;

    private LocalTime endHour;

    private int maxPeople;

    private String description;

    private boolean highlighted;

    private String observations;

    private int ticketsPerUser;

    private String creator;

    private long location;

    private List<String> picturesUrlSave;

    private List<String> picturesUrlDelete;
}
