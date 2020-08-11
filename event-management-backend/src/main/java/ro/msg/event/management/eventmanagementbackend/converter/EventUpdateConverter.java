package ro.msg.event.management.eventmanagementbackend.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.*;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventUpdateConverter {

    public EventDTO convertToDto(Event event) {
        EventDTO eventUpdateDto = new EventDTO();

        eventUpdateDto.setTitle(event.getTitle());
        eventUpdateDto.setSubtitle(event.getSubtitle());
        eventUpdateDto.setObservations(event.getObservations());
        eventUpdateDto.setNoTicketEvent(event.isNoTicketEvent());
        eventUpdateDto.setHighlighted(event.isHighlighted());
        eventUpdateDto.setStatus(event.isStatus());
        eventUpdateDto.setMaxPeople(event.getMaxPeople());
        eventUpdateDto.setCreator(event.getCreator());
        eventUpdateDto.setDescription(event.getDescription());
        eventUpdateDto.setStartDate(event.getStartDate());
        eventUpdateDto.setEndDate(event.getEndDate());

        if (event.getPictures() != null) {
            List<String> picturesUrl = new ArrayList<>();
            for (Picture picture : event.getPictures()) {
                picturesUrl.add(picture.getUrl());
            }
            eventUpdateDto.setPictureURL(picturesUrl);
        }
        return eventUpdateDto;
    }

    public Event convertToEntity(EventDTO eventDTO) {
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
