package ro.msg.event.management.eventmanagementbackend.controller.converter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketSaveDto;
import ro.msg.event.management.eventmanagementbackend.entity.Ticket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
public class CategoryAndTicketsMapReverseConverter implements Converter<List<TicketSaveDto>, Map<Long, List<Ticket>>>{
    @Setter
    @Getter
    private String bookingEmail;

    @Override
    public Map<Long, List<Ticket>> convert(List<TicketSaveDto> obj) {
        Map<Long, List<Ticket>> categoryAndTicketsMap = new HashMap<>();
        obj.forEach(ticketSaveDto ->
        {
            Ticket ticket = Ticket.builder()
                    .name(ticketSaveDto.getName())
                    .emailAddress(bookingEmail)
                    .build();
            if (categoryAndTicketsMap.containsKey(ticketSaveDto.getTicketCategoryId())) {
                categoryAndTicketsMap.get(ticketSaveDto.getTicketCategoryId()).add(ticket);
            } else {
                List<Ticket> tickets = new ArrayList<>();
                tickets.add(ticket);
                categoryAndTicketsMap.put(ticketSaveDto.getTicketCategoryId(), tickets);
            }
        });
        return categoryAndTicketsMap;
    }
}
