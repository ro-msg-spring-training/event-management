import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import GroupIcon from '@material-ui/icons/Group';
import { UserEventList } from '../../../model/UserEventList';
import { useCardStyle } from '../../../styles/userEventsPage/UserEventCardStyle';
import { useStyles } from '../../../styles/CommonStyles';

interface UserEventCardProps {
    event: UserEventList,
    goToEventDetails: (eventId: number) => void
}

export const noImageAvailableSrc = 'https://www.thegreensheet.com/Public/build/images.min/nophoto.png'

function UserEventCard({ event, goToEventDetails }: UserEventCardProps) {
    const classes = useCardStyle();
    const communStyles = useStyles();

    return (
        <Paper className={classes.root}>
            <div>
                <div
                    className={classes.imageWrapper}
                    style={{
                        backgroundImage: 'url(' + (event.images.length > 0 ? event.images[0] : noImageAvailableSrc) + ')',
                    }} />
                <div className={classes.eventInfo}>
                    <Typography variant="h6" color={"primary"}>
                        {event.title}
                    </Typography>

                    <div>
                        <LocationOnIcon className={classes.iconInfo} />
                        {event.location}
                    </div>

                    <div>
                        <EventIcon className={classes.iconInfo} />
                        {event.startDate.toDateString()} - {event.endDate.toDateString()}
                    </div>

                    <div>
                        <QueryBuilderIcon className={classes.iconInfo} />
                        {event.startHour} - {event.endHour}
                    </div>

                    <div>
                        <GroupIcon className={classes.iconInfo} />
                        {event.rate}%
                    </div>
                </div>
            </div>
            <Button
                className={`${communStyles.buttonStyle2} ${communStyles.buttonStyle3} ${classes.detailsButton}`}
                onClick={(e) => goToEventDetails(event.id)}>
                Details
            </Button>
        </Paper>
    )
}

export default UserEventCard;
