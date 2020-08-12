package ro.msg.event.management.eventmanagementbackend.controller.converter;

import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventConverter implements Converter<Event, EventDTO> {

    @Override
    public EventDTO convert(Event event) {
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
}
