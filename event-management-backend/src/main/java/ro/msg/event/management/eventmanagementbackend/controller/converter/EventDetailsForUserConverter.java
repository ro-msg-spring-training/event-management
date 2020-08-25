package ro.msg.event.management.eventmanagementbackend.controller.converter;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDetailsForUserDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class EventDetailsForUserConverter implements Converter<Event, EventDetailsForUserDto>{
    private final TicketCategoryReverseConverter ticketCategoryReverseConverter;

    @Override
    public EventDetailsForUserDto convert(Event event) {
        List<String> picturesUrl = new ArrayList<>();
        if (event.getPictures() != null) {
            for (Picture picture : event.getPictures()) {
                picturesUrl.add(picture.getUrl());
            }
        }

        Location location = event.getEventSublocations().get(0).getSublocation().getLocation();

        return EventDetailsForUserDto.builder()
                .title(event.getTitle())
                .subtitle(event.getSubtitle())
                .description(event.getDescription())
                .observations(event.getObservations())
                .status(event.isStatus())
                .ticketsPerUser(event.getTicketsPerUser())
                .highlighted(event.isHighlighted())
                .maxPeople(event.getMaxPeople())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .startHour(event.getStartHour())
                .endHour(event.getEndHour())
                .creator(event.getCreator())
                .picturesUrlSave(picturesUrl)
                .ticketCategoryDtoList(ticketCategoryReverseConverter.convertAll(event.getTicketCategories()))
                .locationId(location.getId())
                .locationName(location.getName())
                .locationAddress(location.getAddress())
                .ticketInfo(event.getTicketInfo())
                .ticketCategoryToDelete(new ArrayList<>())
                .id(event.getId())
                .build();
    }
}
