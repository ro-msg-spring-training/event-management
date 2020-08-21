import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import UserEventCard from './UserEventCard';
import { UserEventList } from '../../../model/UserEventList';

interface UserEventListProps {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    goToEventDetails: (eventId: number) => void
}


function UserEventListDumb({ events, isLoading, isError, goToEventDetails }: UserEventListProps) {
    return (
        isError ?
            <p> Eroare </p> :
            isLoading ?
                <LinearProgress /> :
                <Grid container spacing={3}>
                    {
                        events.map(event =>
                            <Grid item key={event.id} xs={12} sm={6} md={4} xl={3}>
                                <UserEventCard event={event} goToEventDetails={goToEventDetails} />
                            </Grid>
                        )
                    }
                </Grid>
    )
}

export default UserEventListDumb;
