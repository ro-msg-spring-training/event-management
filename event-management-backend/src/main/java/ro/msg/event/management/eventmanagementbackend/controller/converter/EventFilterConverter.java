package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

@Component
public class EventFilterConverter implements Converter<EventView, EventFilteringDto> {
    @Override
    public EventFilteringDto convert(EventView eventView) {
        return EventFilteringDto.builder()
                .title(eventView.getTitle())
                .subtitle(eventView.getSubtitle())
                .startDate(eventView.getStartDate().toLocalDate())
                .endDate(eventView.getEndDate().toLocalDate())
                .location(eventView.getLocation())
                .startHour(eventView.getStartDate().toLocalTime())
                .endHour(eventView.getEndDate().toLocalTime())
                .occupancyRate(eventView.getRate())
                .build();
    }
}
