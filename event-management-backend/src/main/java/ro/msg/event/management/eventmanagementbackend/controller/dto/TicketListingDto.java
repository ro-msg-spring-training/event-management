package ro.msg.event.management.eventmanagementbackend.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TicketListingDto {
    private Long bookingId;
    private LocalDate bookingDate;
    private String eventName;
    private String ticketCategory;
    private String name;
    private String pdfUrl;
}
