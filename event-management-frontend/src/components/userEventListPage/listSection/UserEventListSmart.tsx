import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserEventListDumb from './UserEventListDumb';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { UserEventList } from '../../../model/UserEventList';
import { fetchUserEvents } from '../../../actions/UserEventListActions';
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';

interface UserEventListProps {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    isMore: boolean,
    page: number,
    limit: number,
    fetchUserEvents: (page: number, limit: number) => void
}

function UserEventListSmart({ events, isLoading, isError, isMore, page, limit, fetchUserEvents }: UserEventListProps) {
    const [isFetching, setIsFetching] = useState(false);
    const [t] = useTranslation();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;

        if (isMore) {
            fetchUserEvents(page + 1, limit);
        }
        setIsFetching(false);
    }, [isFetching]);

    function handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setIsFetching(true);
        }
    }
    const history = useHistory()

    useEffect(() => {
        fetchUserEvents(1, limit);
    }, [page, limit]);


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
    isMore: state.userEvents.isMore
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchUserEvents: (page: number, limit: number) => dispatch(fetchUserEvents(page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEventListSmart);
