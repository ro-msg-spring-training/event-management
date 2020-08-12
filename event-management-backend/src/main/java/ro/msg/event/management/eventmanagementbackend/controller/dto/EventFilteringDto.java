package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventFilteringDto {
    private String title;
    private String subtitle;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startHour;
    private LocalTime endHour;
    private float occupancyRate;
}
