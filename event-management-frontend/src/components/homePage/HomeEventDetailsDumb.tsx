import React from 'react';
import { Event } from "../../model/Event";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: 16,
        "&:hover": {
            boxShadow: `0 6px 12px 0 grey`,
            cursor: 'pointer',
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20
    },
    date: {
        color: '#F2AE30',
        fontSize: 15
    },
    location: {
        color: '#F2AE30',
        fontSize: 15
    },
    eventCard: {
        padding: 15,
    },
});

interface Props {
    events: Event
}

const HomeEventDetailsDumb = (props: Props) => {
    const classes = useStyles()

    const id = props.events.id;
    const title = props.events.title;
    const location = props.events.location;
    const startDate = props.events.startDate;
    const endDate = props.events.endDate;

    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Link to={`/admin/events/${id}`} style={{ textDecoration: 'none' }}>
            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.eventCard}>
                    <Typography className={classes.title}>
                        {title}
                    </Typography>

                    {
                        startDate === endDate ?
                        <Typography className={classes.date}><DateRangeIcon/> {startDate}</Typography> :
                        <Typography className={classes.date}><DateRangeIcon/> {startDate} - {endDate}</Typography>
                    }

                    <Typography className={classes.location} >
                        <LocationOnIcon fontSize={"small"}/> {location}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default HomeEventDetailsDumb