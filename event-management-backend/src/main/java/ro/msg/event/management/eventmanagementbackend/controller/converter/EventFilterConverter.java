package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventFilteringDto;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

@Component
public class EventFilterConverter implements Converter<EventView, EventFilteringDto> {
    @Override
    public EventFilteringDto convert(EventView eventView) {
        EventFilteringDto eventFilteringDto = new EventFilteringDto();
        eventFilteringDto.setTitle(eventView.getTitle());
        eventFilteringDto.setSubtitle(eventView.getSubtitle());
        eventFilteringDto.setLocation(eventView.getLocation());
        eventFilteringDto.setStartDate(eventView.getStartDate().toLocalDate());
        eventFilteringDto.setEndDate(eventView.getEndDate().toLocalDate());
        eventFilteringDto.setStartHour(eventView.getStartDate().toLocalTime());
        eventFilteringDto.setEndHour(eventView.getEndDate().toLocalTime());
        eventFilteringDto.setOccupancyRate(eventView.getRate());
        return eventFilteringDto;

    }
}
