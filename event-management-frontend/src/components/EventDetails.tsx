import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import EventModel from "../model/EventModel";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },

        //Colors
        dark: {
            color: '#133655',
        },
        light: {
            color: '#6BB7D0',
        },
        ghost: {
            color: '#F4F5F9',
        },
        white: {
            color: '#FFFFFF',
        },
        yellow: {
            color: '#F2AE30',
        },
    }),
);

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(even)': {
                backgroundColor: '#F4F5F9',
            },
        },
    }),
)(TableRow);

const EventDetails = (props: EventModel) => {
    const id = props.id;
    const title = props.name;
    const subtitle = props.subtitle;
    const location = props.location;
    const date = props.date;
    const hour = props.hour;
    const occRate = props.occRate;

    const classes = useStyles();

    return (
        <StyledTableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell>{subtitle}</StyledTableCell>
            <StyledTableCell>{location}</StyledTableCell>
            <StyledTableCell>{date}</StyledTableCell>
            <StyledTableCell>{hour}</StyledTableCell>
            <StyledTableCell>{occRate}</StyledTableCell>

            <StyledTableCell>
                <Link to={`/events/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={classes.yellow}>Details</Button>
                </Link>
                <Link to={`/validate/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={classes.yellow}>Validate</Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default EventDetails