package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketCategoryDto;
import ro.msg.event.management.eventmanagementbackend.entity.TicketCategory;

@Component
public class TicketCategoryConverter implements Converter<TicketCategoryDto, TicketCategory> {
    @Override
    public TicketCategory convert(TicketCategoryDto obj) {
        return TicketCategory.builder()
                .description(obj.getDescription())
                .price(obj.getPrice())
                .subtitle(obj.getSubtitle())
                .ticketsPerCategory(obj.getTicketsPerCategory())
                .title(obj.getTitle())
                .build();
    }
}
