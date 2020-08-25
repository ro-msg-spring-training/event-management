import React from 'react';
import { Grid } from '@material-ui/core';
import UserEventCard from './UserEventCard';
import { UserEventList } from '../../../model/UserEventList';
import { TFunction } from 'i18next';

interface UserEventListProps {
    events: UserEventList[],
    translation: TFunction,
    goToEventDetails: (eventId: number) => void
}

function UserEventListDumb({ events, translation, goToEventDetails }: UserEventListProps) {
    return (
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
