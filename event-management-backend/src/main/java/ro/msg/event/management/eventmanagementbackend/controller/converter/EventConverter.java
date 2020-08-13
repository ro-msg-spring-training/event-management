package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventConverter implements Converter<Event, EventDto> {

    @Override
    public EventDto convert(Event event) {
        List<String> picturesUrl = new ArrayList<>();
        if (event.getPictures() != null) {
            for (Picture picture : event.getPictures()) {
                picturesUrl.add(picture.getUrl());
            }
        }

        return EventDto.builder()
                .title(event.getTitle())
                .subtitle(event.getSubtitle())
                .description(event.getDescription())
                .observations(event.getObservations())
                .status(event.isStatus())
                .noTicketEvent(event.isNoTicketEvent())
                .highlighted(event.isHighlighted())
                .maxPeople(event.getMaxPeople())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .startHour(event.getStartHour())
                .endHour(event.getEndHour())
                .creator(event.getCreator())
                .pictureURL(picturesUrl)
                .build();
    }
}
