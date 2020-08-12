package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventReverseConverter implements Converter<EventDto, Event> {

    @Override
    public Event convert(EventDto eventDTO) {
        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .subtitle(eventDTO.getSubtitle())
                .observations(eventDTO.getObservations())
                .noTicketEvent(eventDTO.isNoTicketEvent())
                .highlighted(eventDTO.isHighlighted())
                .status(eventDTO.isStatus())
                .maxPeople(eventDTO.getMaxPeople())
                .creator(eventDTO.getCreator())
                .description(eventDTO.getDescription())
                .startDate(eventDTO.getStartDate())
                .endDate(eventDTO.getEndDate())
                .build();

        if (eventDTO.getPictureURL() != null) {
            List<Picture> pictures = new ArrayList<>();

            for (String urlPicture : eventDTO.getPictureURL()) {
                Picture picture = new Picture();

                picture.setUrl(urlPicture);
                picture.setEvent(event);

                pictures.add(picture);
            }
            event.setPictures(pictures);
        }
        return event;
    }
}
