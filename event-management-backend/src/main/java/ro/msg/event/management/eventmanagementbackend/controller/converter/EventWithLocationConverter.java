package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventWithLocationDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Location;

@Component
public class EventWithLocationConverter implements Converter<Event, EventWithLocationDto> {

    @Override
    public EventWithLocationDto convert(Event obj) {
        Location location = obj.getEventSublocations().get(0).getSublocation().getLocation();
        return EventWithLocationDto.builder()
                .id(obj.getId())
                .title(obj.getTitle())
                .subtitle(obj.getSubtitle())
                .startDate(obj.getStartDate())
                .endDate(obj.getEndDate())
                .startHour(obj.getStartHour())
                .endHour(obj.getEndHour())
                .ticketInfo(obj.getTicketInfo())
                .locationName(location.getName())
                .locationAddress(location.getAddress())
                .build();
    }
}
