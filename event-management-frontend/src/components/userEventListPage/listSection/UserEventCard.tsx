import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import GroupIcon from '@material-ui/icons/Group';
import { UserEventList } from '../../../model/UserEventList';
import { useCardStyle } from '../../../styles/userEventsPage/UserEventCardStyle';
import { useStyles } from '../../../styles/CommonStyles';
import { Link } from 'react-router-dom';
import { TFunction } from 'i18next';

interface UserEventCardProps {
    event: UserEventList,
    translation: TFunction,
    goToEventDetails: (eventId: number) => void
}

export const noImageAvailableSrc = 'https://www.thegreensheet.com/Public/build/images.min/nophoto.png'

function UserEventCard({ event, translation, goToEventDetails }: UserEventCardProps) {
    const classes = useCardStyle();
    const communStyles = useStyles();

    return (
        <Paper className={classes.root}>
            <div>
                <div
                    onClick={e => goToEventDetails(event.id)}
                    className={classes.imageWrapper}
                    style={{
                        backgroundImage: 'url(' + (event.picture ? event.picture : noImageAvailableSrc) + ')',
                    }} />

                <div className={classes.eventInfo}>
                    <Typography variant="h6" color={"primary"} onClick={e => goToEventDetails(event.id)}>
                        {event.title}
                    </Typography>

                    <Typography variant="subtitle1">
                        <LocationOnIcon className={classes.iconInfo} />
                        {event.location}
                    </Typography>

                    <Typography variant="subtitle1">
                        <EventIcon className={classes.iconInfo} />
                        {event.startDate} - {event.endDate}
                    </Typography>

                    <Typography variant="subtitle1">
                        <QueryBuilderIcon className={classes.iconInfo} />
                        {event.startTime} - {event.endTime}
                    </Typography>

                    <Typography variant="subtitle1">
                        <GroupIcon className={classes.iconInfo} />
                        {event.rate}%
                    </Typography>
                </div>
            </div>

            <Button
                className={`${communStyles.buttonStyle2} ${communStyles.buttonStyle3} ${classes.detailsButton}`}
                onClick={(e) => goToEventDetails(event.id)}>
                {translation("userEventList.detailsButton")}
            </Button>
        </Paper>
    )
}

export default UserEventCard;
