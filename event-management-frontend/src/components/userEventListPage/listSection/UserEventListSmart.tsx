import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserEventListDumb from './UserEventListDumb';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { UserEventList } from '../../../model/UserEventList';
import { fetchUserEvents, setIsFetching } from '../../../actions/UserEventListActions';
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';

interface UserEventListProps {
    events: UserEventList[],
    isError: boolean,
    isMore: boolean,
    isFetching: boolean,
    page: number,
    limit: number,
    fetchUserEvents: (page: number, limit: number) => void
    setIsFetching: (isLoading: boolean) => void
}

function UserEventListSmart({ events, isError, isMore, isFetching, page, limit, fetchUserEvents, setIsFetching }: UserEventListProps) {
    const history = useHistory();
    const [translation] = useTranslation();

    useEffect(() => {
        if (!isFetching) return;

        if (isMore) {
            fetchUserEvents(page, limit);
        }
    }, [isFetching]);

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (isMore) {
                setIsFetching(true);
            }
        }
    }

    useEffect(() => {
        fetchUserEvents(page, limit);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const goToEventDetails = (eventId: number) => {
        history.push(`/user/events/${eventId}`);
    }

    return (
        <>
            {isError ?
                <p style={{ textAlign: 'center' }} > {translation("userEventList.errorMessage")} </p> :
                isFetching && page === 1 ?
                    <LinearProgress /> :
                    <UserEventListDumb
                        translation={translation}
                        events={events}
                        goToEventDetails={goToEventDetails}
                    />
            }
            {isFetching && <CircularProgress style={{ alignSelf: 'center', margin: '30px' }} />}
        </>
    )
}

const mapStateToProps = (state: AppState) => ({
    events: state.userEvents.events,
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
