import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserEventListDumb from './UserEventListDumb';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { UserEventList } from '../../../model/UserEventList';
import { fetchUserEvents, setIsFetching } from '../../../actions/UserEventListActions';
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';

interface UserEventListProps {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    isMore: boolean,
    isFetching: boolean,
    page: number,
    limit: number,
    fetchUserEvents: (page: number, limit: number) => void
    setIsFetching: (isLoading: boolean) => void
}

function UserEventListSmart({ events, isLoading, isError, isMore, isFetching, page, limit, fetchUserEvents, setIsFetching }: UserEventListProps) {
    const history = useHistory();
    const [t] = useTranslation();

    useEffect(() => {
        console.log('isMore useEffect', isMore)
    }, [isMore])

    useEffect(() => {
        console.log('isFetching useEffect', isFetching)
        if (!isFetching) return;

        if (isMore) {
            fetchUserEvents(page + 1, limit);
        }
        // setIsFetching(false);
    }, [isFetching]);

    const handleScroll = (event: any) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log(events)
            console.log('handle scroll, is More', isMore)
            if (isMore) {
                setIsFetching(true);
            }
        }
    }

    useEffect(() => {
        fetchUserEvents(1, limit);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const goToEventDetails = (eventId: number) => {
        history.push(`/user/events/${eventId}`);
    }

    return (
        <>
            <UserEventListDumb
                translation={t}
                events={events}
                isLoading={isLoading}
                isError={isError}
                goToEventDetails={goToEventDetails}
            />
            {isFetching && <CircularProgress style={{ alignSelf: 'center', margin: '30px' }} />}
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    events: state.userEvents.events,
    isLoading: state.userEvents.isLoading,
    isError: state.userEvents.isError,
    page: state.userEvents.page,
    limit: state.userEvents.limit,
    isMore: state.userEvents.isMore,
    isFetching: state.userEvents.isFetching
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUserEvents: (page: number, limit: number) => dispatch(fetchUserEvents(page, limit)),
    setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEventListSmart);
