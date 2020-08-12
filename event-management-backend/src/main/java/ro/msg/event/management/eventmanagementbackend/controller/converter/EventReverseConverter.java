package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventReverseConverter implements Converter<EventDTO, Event>{

    @Override
    public Event convert(EventDTO eventDTO) {
        Event event = new Event();

        event.setTitle(eventDTO.getTitle());
        event.setSubtitle(eventDTO.getSubtitle());
        event.setObservations(eventDTO.getObservations());
        event.setNoTicketEvent(eventDTO.isNoTicketEvent());
        event.setHighlighted(eventDTO.isHighlighted());
        event.setStatus(eventDTO.isStatus());
        event.setMaxPeople(eventDTO.getMaxPeople());
        event.setCreator(eventDTO.getCreator());
        event.setDescription(eventDTO.getDescription());
        event.setStartDate(eventDTO.getStartDate());
        event.setEndDate(eventDTO.getEndDate());

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
