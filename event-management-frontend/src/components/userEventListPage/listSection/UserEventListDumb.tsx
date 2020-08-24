import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import UserEventCard from './UserEventCard';
import { UserEventList } from '../../../model/UserEventList';
import { TranslationProps } from 'react-i18next';
import { TFunction } from 'i18next';

interface UserEventListProps {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    translation: TFunction,
    goToEventDetails: (eventId: number) => void
}


function UserEventListDumb({ events, isLoading, isError, translation, goToEventDetails }: UserEventListProps) {
    return (
        isError ?
            <p> {translation("userEventList.errorMessage")} </p> :
            isLoading ?
                <LinearProgress /> :
                <Grid container spacing={3}>
                    {
                        events.map(event =>
                            <Grid item key={event.id} xs={12} sm={6} md={4} xl={3}>
                                <UserEventCard 
                                event={event} 
                                goToEventDetails={goToEventDetails} 
                                translation={translation}
                                />
                            </Grid>
                        )
                    }
                </Grid>
    )
}

export default UserEventListDumb;
