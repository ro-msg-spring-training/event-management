import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Grid, LinearProgress } from '@material-ui/core';
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
    handleOnClick: (id: number) => void,
    updatePageNumber: (page: number) => void
}

function EventsSectionDumb({ past, events, page, noPages, isError, isLoading, handleOnClick, updatePageNumber }: UserHomePageProps) {
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
                        <LinearProgress /> :
                        noPages ?
                            <Grid container spacing={1}>
                                {events.map(e =>
                                    <Grid item xs={12} key={e.id} >
                                        <EventRow
                                            id={e.id}
                                            title={e.title}
                                            startDate={e.startDate}
                                            endDate={e.endDate}
                                            occupancyRate={e.occupancyRate}
                                            handleOnClick={() => handleOnClick(e.id)} />
                                    </Grid>
                                )}
                            </Grid> :
                            <>
                                {past ? 'There is no events in the past' : 'There is no events in the future'}
                            </>
                }
            </CardContent>

            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                {!noPages ? '' :
                    <>
                        {
                            page === 0 ?
                                <NavigateBeforeIcon className={classes.invisibleIcon} /> :
                                <NavigateBeforeIcon className={classes.visibleIcon} onClick={() => updatePageNumber(page - 1)} />
                        }

                        <div>
                            {page + 1}/{noPages}
                        </div>

                        {
                            page + 1 === noPages ?
                                <NavigateNextIcon className={classes.invisibleIcon} /> :
                                <NavigateNextIcon className={classes.visibleIcon} onClick={() => updatePageNumber(page + 1)}/>
                        }
                    </>
                }
            </CardActions>
        </Card>
    )
}

export default EventsSectionDumb;
