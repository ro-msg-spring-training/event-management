package ro.msg.event.management.eventmanagementbackend.comparator;

import ro.msg.event.management.eventmanagementbackend.entity.view.EventView;

import java.util.Comparator;

public class EventViewDateComparator implements Comparator<EventView> {
    @Override
    public int compare(EventView o1, EventView o2) {
        return o1.getStartDate().compareTo(o2.getStartDate());
    }

}
