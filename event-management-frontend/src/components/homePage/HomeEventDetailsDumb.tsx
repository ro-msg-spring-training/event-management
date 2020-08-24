import React from 'react';
import Event from "../../model/Event";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
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

const HomeEventDetailsDumb = (props: Event) => {
    const classes = useStyles()
    const [t] = useTranslation();
    const id = props.id;
    const title = props.title;
    const subtitle = props.subtitle;
    const location = props.location;
    const date = props.date;
    const hour = props.hour;
    const occRate = props.occRate;
    const name = props.name;
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