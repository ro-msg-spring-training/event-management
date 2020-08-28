import React, { useEffect } from 'react'
import EventsSectionDumb from './EventsSectionDumb'
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { EventCard } from '../../../model/userHome/EventCard';
import { fetchUserPastEvents, fetchUserUpcomingEvents } from '../../../actions/UserHomePageActions';

interface EventProps {
    events: EventCard[],
    page: number,
    limit: number,
    isMore: boolean,
    noPages: number,
    isError: boolean,
    isLoading: boolean
}

interface UserHomePageProps {
    past?: boolean,
    pastEvents: EventProps,
    upcomingEvents: EventProps,
    fetchUserPastEvents: (page: number, limit: number) => void,
    fetchUserUpcomingEvents: (page: number, limit: number) => void
}

function EventsSectionSmart({ past, pastEvents, upcomingEvents, fetchUserPastEvents, fetchUserUpcomingEvents }: UserHomePageProps) {
    const events = past ? pastEvents.events : upcomingEvents.events;
    const page = past ? pastEvents.page : upcomingEvents.page;
    const limit = past ? pastEvents.limit : upcomingEvents.limit;
    const noPages = past ? pastEvents.noPages : upcomingEvents.noPages;
    const isError = past ? pastEvents.isError : upcomingEvents.isError;
    const isLoading = past ? pastEvents.isLoading : upcomingEvents.isLoading;
    const fetchEvents = past ? fetchUserPastEvents : fetchUserUpcomingEvents;
    const eventsMock = {
        "more": false,
        "events": [
            {
                "id": 2,
                "title": "msg Party",
                "occupancyRate": 0,
                "startDate": "2019-10-18",
                "endDate": "2019-10-18"
            },
            {
                "id": 7,
                "title": "Fruit Party",
                "occupancyRate": 0,
                "startDate": "2019-09-17",
                "endDate": "2019-09-17"
            },
            {
                "id": 1,
                "title": "Star Wars Party",
                "occupancyRate": 0,
                "startDate": "2019-09-17",
                "endDate": "2019-09-17"
            }
        ],
        "noPages": 1
    }

    useEffect(() => {
        fetchEvents(page, limit);
    }, [page, limit]);

    const handleOnClick = (id: number) => {
        console.log(`navigate to /user/events/${id}`)
    }

    return (
        <EventsSectionDumb
            past={past}
            events={eventsMock.events as EventCard[]}
            isLoading={isLoading}
            isError={isError}
            noPages={eventsMock.noPages}
            page={page}
            handleOnClick={handleOnClick}
        />
    )
}

const mapStateToProps = (state: AppState) => ({
    pastEvents: state.userHome.past,
    upcomingEvents: state.userHome.upcoming
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchUserPastEvents: (page: number, limit: number) => dispatch(fetchUserPastEvents(page, limit)),
    fetchUserUpcomingEvents: (page: number, limit: number) => dispatch(fetchUserUpcomingEvents(page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsSectionSmart);
