import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Grid, LinearProgress, Typography } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { EventCard } from '../../../model/userHome/EventCard';
import EventRow from './EventRow';
import { useEventCardStyle } from '../../../styles/userHomePage/EventCardStyle';
import { TFunction } from 'i18next';

interface UserHomePageProps {
    past?: boolean,
    events: EventCard[],
    page: number,
    noPages: number,
    isError: boolean,
    isLoading: boolean,
    translation: TFunction,
    handleOnClick: (id: number) => void,
    updatePageNumber: (page: number) => void
}

function EventsSectionDumb({ past, events, page, noPages, isError, isLoading, translation, handleOnClick, updatePageNumber }: UserHomePageProps) {
    const classes = useEventCardStyle();

    return (
        <Card>
            <CardHeader
                className={classes.header}
                title={past ? translation('userHomePage.pastEvents') : translation('userHomePage.upcomingEvents')}
            />

            <CardContent className={classes.eventCard}>
                {isError ?
                    <Typography variant="subtitle1"> {translation('userHomePage.messageError')}</Typography> :
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
                            <Typography variant="subtitle1"> {translation('userHomePage.noEvents')} </Typography>
                }
            </CardContent>

            <CardActions className={classes.pagination}>
                {!noPages ? <></> :
                    <>
                        {
                            page === 0 ?
                                <NavigateBeforeIcon className={classes.invisibleIcon} /> :
                                <NavigateBeforeIcon className={classes.visibleIcon} onClick={() => updatePageNumber(page - 1)} />
                        }

                        <Typography variant="body2"> {page + 1}/{noPages} </Typography>

                        {
                            page + 1 === noPages ?
                                <NavigateNextIcon className={classes.invisibleIcon} /> :
                                <NavigateNextIcon className={classes.visibleIcon} onClick={() => updatePageNumber(page + 1)} />
                        }
                    </>
                }
            </CardActions>
        </Card>
    );
}

export default EventsSectionDumb;
