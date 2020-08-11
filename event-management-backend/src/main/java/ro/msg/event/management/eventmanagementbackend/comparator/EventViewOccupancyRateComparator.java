package ro.msg.event.management.eventmanagementbackend.comparator;

import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

import java.util.Comparator;

public class EventViewOccupancyRateComparator implements Comparator<EventView> {
    @Override
    public int compare(EventView o1, EventView o2) {
        return Float.compare(o1.getRate(),o2.getRate());
    }
}
