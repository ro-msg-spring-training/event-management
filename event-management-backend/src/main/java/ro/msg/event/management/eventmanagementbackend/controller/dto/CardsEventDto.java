package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardsEventDto {
    private Long id;
    private String title;
    private Float occupancyRate;
    private LocalDate startDate;
    private LocalDate endDate;
}
