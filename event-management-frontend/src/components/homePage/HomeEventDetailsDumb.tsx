import React from 'react';
import { Event } from "../../model/Event";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
      fontSize: 24
    },
    date: {
        color: '#F2AE30',
    },
    location: {
        color: '#F2AE30',
    },
});

interface Props {
    events: Event
}

const HomeEventDetailsDumb = (props: Props) => {
    const classes = useStyles()

    const title = props.events.title;
    const location = props.events.location;
    const date = props.events.startDate;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title}>
                    {bull}{title}{bull}
                </Typography>
                <Typography className={classes.date}>
                    {date}
                </Typography>
                <Typography className={classes.location} >
                    {location}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default HomeEventDetailsDumb