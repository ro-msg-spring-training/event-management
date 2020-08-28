import React, { useEffect } from 'react'
import EventsSectionDumb from './EventsSectionDumb'
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { EventCard } from '../../../model/userHome/EventCard';
import { fetchUserPastEvents, fetchUserUpcomingEvents } from '../../../actions/UserHomePageActions';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const events = past ? pastEvents.events : upcomingEvents.events;
    const page = past ? pastEvents.page : upcomingEvents.page;
    const limit = past ? pastEvents.limit : upcomingEvents.limit;
    const noPages = past ? pastEvents.noPages : upcomingEvents.noPages;
    const isError = past ? pastEvents.isError : upcomingEvents.isError;
    const isLoading = past ? pastEvents.isLoading : upcomingEvents.isLoading;
    const fetchEvents = past ? fetchUserPastEvents : fetchUserUpcomingEvents;

    useEffect(() => {
        fetchEvents(page, limit);
    }, [page, limit, fetchEvents]);

    const handleOnClick = (id: number) => {
        history.push(`/user/events/${id}`)
    }

    return (
        <EventsSectionDumb
            past={past}
            events={events}
            isLoading={isLoading}
            isError={isError}
            noPages={noPages}
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
