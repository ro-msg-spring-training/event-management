package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.msg.event.management.eventmanagementbackend.controller.converter.Converter;
import ro.msg.event.management.eventmanagementbackend.controller.converter.EventReverseConverter;
import ro.msg.event.management.eventmanagementbackend.controller.dto.EventDto;
import ro.msg.event.management.eventmanagementbackend.controller.dto.TicketCategoryDto;
import ro.msg.event.management.eventmanagementbackend.entity.BaseEntity;
import ro.msg.event.management.eventmanagementbackend.entity.Event;
import ro.msg.event.management.eventmanagementbackend.entity.Location;
import ro.msg.event.management.eventmanagementbackend.entity.Picture;
import ro.msg.event.management.eventmanagementbackend.exception.ExceededCapacityException;
import ro.msg.event.management.eventmanagementbackend.exception.OverlappingEventsException;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.service.LocationService;

import javax.transaction.Transactional;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class SaveEventIntegrationTest {

    @Autowired
    private EventService eventService;

    @Autowired
    private Converter<EventDto, Event> convertToEntity;

    @Autowired
    private LocationService locationService;

    @Test
    void testSaveEvent() throws SQLException {
        String query = "insert into `location` values(1,'The Office','Bd. 21 Decembrie', 46.24,24.3);\n" +
                "insert into `location` values(2,'Campus Observator','str Observatorului nr 34', 46.21,24.3);\n" +
                "insert into `sublocation` values(1,'Floor 1',200,1);\n" +
                "insert into `sublocation` values(2,'Camin 5',300,2);";

        Connection conn = DriverManager.getConnection("jdbc:h2:mem:test", "sa", "");
        Statement statement = conn.createStatement();
        statement.execute(query);

        List<String> picturesUrlSave = new ArrayList<>();
        picturesUrlSave.add("url1");
        picturesUrlSave.add("url2");

        TicketCategoryDto ticketCategoryDto = TicketCategoryDto.builder()
                .title("titleCategory")
                .subtitle("subtitle")
                .price((float)3.4)
                .description("desc")
                .ticketsPerCategory(2)
                .build();

        List<TicketCategoryDto> ticketCategoryDtoList = new ArrayList<>();
        ticketCategoryDtoList.add(ticketCategoryDto);



        EventDto eventDto = EventDto.builder()
                .title("title")
                .subtitle("subtitle")
                .description("description")
                .observations("-")
                .status(true)
                .ticketsPerUser(10)
                .highlighted(false)
                .maxPeople(30)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .startHour(LocalTime.now())
                .endHour(LocalTime.now().plusHours(3))
                .creator("")
                .picturesUrlSave(picturesUrlSave)
                .ticketCategoryDtoList(ticketCategoryDtoList)
                .location(1)
                .build();


        long locationId = 1;

        Location location = locationService.findByID(locationId);


        List<Long> sublocationIDs = location.getSublocation().stream()
                .map(BaseEntity::getId)
                .collect(Collectors.toList());

        Event event = ((EventReverseConverter) convertToEntity).convertForUpdate(eventDto, false);


        try {
            long eventId = eventService.saveEvent(event, sublocationIDs);

            Event testEvent = eventService.getEvent(eventId);

            assertEquals(event, testEvent);

            List<String> testUrls = testEvent.getPictures().stream()
                    .map(Picture::getUrl).collect(Collectors.toList());

            assertEquals(picturesUrlSave, testUrls);


        } catch (OverlappingEventsException | ExceededCapacityException e) {
            e.printStackTrace();
        }


    }

}
