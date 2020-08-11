package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.dto.EventDTO;
import ro.msg.event.management.eventmanagementbackend.entity.*;
import ro.msg.event.management.eventmanagementbackend.security.User;
import ro.msg.event.management.eventmanagementbackend.service.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final PictureService pictureService;
    private final SublocationService sublocationService;
    private final EventSublocationService eventSublocationService;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Event saveEvent(@RequestBody EventDTO eventDTO) throws Exception {


        List<Long> sublocationIDs = eventDTO.getSubLocation();

        ModelMapper modelMapper = new ModelMapper();
        Event event = modelMapper.map(eventDTO, Event.class);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        String creator = user.getIdentificationString();
        event.setCreator(creator);

        long eventID = eventService.saveEvent(event, sublocationIDs);

        eventDTO.getPictureURL().forEach((url) -> pictureService.savePicture(new Picture(url, event)));

        sublocationIDs.forEach((sublocationID) -> {

            EventSublocationID esID = new EventSublocationID(eventID, sublocationID);
            EventSublocation eventSublocation = new EventSublocation();
            eventSublocation.setEventSublocationID(esID);
            eventSublocation.setEvent(event);
            eventSublocation.setSublocation(sublocationService.findById(sublocationID));
            eventSublocationService.saveES(eventSublocation);
        });

        return event;
    }

}

