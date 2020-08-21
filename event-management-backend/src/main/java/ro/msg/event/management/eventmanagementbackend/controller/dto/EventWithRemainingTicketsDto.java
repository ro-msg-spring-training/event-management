package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventWithRemainingTicketsDto {
    EventDto eventDto;
    List<AvailableTicketsPerCategory> availableTicketsPerCategoryList;
}
