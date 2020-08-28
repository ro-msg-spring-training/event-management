import React from 'react'
import { Card, CardHeader, CardContent, CardActions, CircularProgress, Grid } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { EventCard } from '../../../model/userHome/EventCard';
import EventRow from './EventRow';
import { useEventCardStyle } from '../../../styles/userHomePage.tsx/EventCardStyle';

interface UserHomePageProps {
    past?: boolean,
    events: EventCard[],
    page: number,
    noPages: number,
    isError: boolean,
    isLoading: boolean,
    handleOnClick: (id: number) => void
}

function EventsSectionDumb({ past, events, page, noPages, isError, isLoading, handleOnClick }: UserHomePageProps) {
    const classes = useEventCardStyle();

    return (
        <Card>
            <CardHeader 
                className={classes.header}
                title={past ? 'Past events' : 'Upcoming events'}
            />

            <CardContent>
                {isError ?
                    'Error' :
                    isLoading ?
                        <CircularProgress /> :
                        <Grid container spacing={1}>
                            {events.map(e =>
                                <Grid item xs={12} >
                                    <EventRow
                                        key={e.id}
                                        id={e.id}
                                        title={e.title}
                                        startDate={e.startDate}
                                        endDate={e.endDate}
                                        occupancyRate={e.occupancyRate}
                                        handleOnClick={() => handleOnClick(e.id)} />
                                </Grid>
                            )}
                        </Grid>
                }
            </CardContent>

            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    page === 0 ?
                        <NavigateBeforeIcon style={{ visibility: 'hidden' }} /> :
                        <NavigateBeforeIcon />
                }
                <div>
                    {page + 1}/{noPages}
                </div>
                {
                    page + 1 === noPages ?
                        <NavigateNextIcon style={{ visibility: 'hidden' }} /> :
                        <NavigateNextIcon />
                }
            </CardActions>
        </Card>
    )
}

export default EventsSectionDumb;
