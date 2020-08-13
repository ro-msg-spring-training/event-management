package ro.msg.event.management.eventmanagementbackend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;
import ro.msg.event.management.eventmanagementbackend.service.EventService;
import ro.msg.event.management.eventmanagementbackend.utils.ComparisonSign;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class FilteringEventsIntegrationTests {

    @Autowired
    private EventService eventService;

    @Test
    public void filterEventsTest() {
//            List<EventView> eventViews =eventService.filterAndPaginate(null,null,true,true,null,null, null, ComparisonSign.GREATER,(float)0,null,null,1,1);
//            assertThat(eventViews.size()).isEqualTo(1);
//            eventViews =eventService.filterAndPaginate(null,null,true,true,null,null, null,ComparisonSign.GREATER,(float)0,null,null,2,1);
//            assertThat(eventViews).isEmpty();
//            eventViews = eventService.filterAndPaginate(null,null,true,null,null,LocalDateTime.of(2020,9,17,12,50,0),LocalDateTime.of(2020,9,17,16,50,0),ComparisonSign.GREATER,(float)0,null,null,2,1);
//            assertThat(eventViews).isEmpty();
    }
}
