package ro.msg.event.management.eventmanagementbackend.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class EventReverseConverter implements Converter<EventDto, Event> {

    private final TicketCategoryConverter ticketCategoryConverter;

    @Override
    public Event convert(EventDto eventDTO) {
        Event event = Event.builder()
                .title(eventDTO.getTitle())
                .subtitle(eventDTO.getSubtitle())
                .observations(eventDTO.getObservations())
                .ticketsPerUser(eventDTO.getTicketsPerUser())
                .highlighted(eventDTO.isHighlighted())
                .status(eventDTO.isStatus())
                .maxPeople(eventDTO.getMaxPeople())
                .creator(eventDTO.getCreator())
                .description(eventDTO.getDescription())
                .startDate(eventDTO.getStartDate())
                .endDate(eventDTO.getEndDate())
                .startHour(eventDTO.getStartHour())
                .endHour(eventDTO.getEndHour())
                .build();

        if (eventDTO.getPicturesUrlSave() != null) {
            List<Picture> pictures = new ArrayList<>();

            for (String urlPicture : eventDTO.getPicturesUrlSave()) {
                Picture picture = new Picture();

                picture.setUrl(urlPicture);
                picture.setEvent(event);

                pictures.add(picture);
            }
            event.setPictures(pictures);
        }

        return event;
    }

    public Event convertForUpdate(EventDto eventDto, boolean update){
        Event event = convert(eventDto);
        if(update){
            event.setTicketCategories(ticketCategoryConverter.convertAllForUpdate(eventDto.getTicketCategoryDtoList()));
        }else{
            event.setTicketCategories(ticketCategoryConverter.convertAll(eventDto.getTicketCategoryDtoList()));
        }
        return event;
    }
}
