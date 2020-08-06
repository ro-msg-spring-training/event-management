import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import EventModel from "../model/EventModel";


const EventDetails = (props: EventModel) => {
    const id = props.id;
    const title = props.title;
    //const subtitle = props.subtitle;
    const location = props.location;
    //const date = props.date;
    const hour = props.hour;
    //const occRate = props.occRate;

    return (
        <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>{location}</TableCell>
            <TableCell>{hour}</TableCell>
            <TableCell>
                <Link to={`/events/${id}`} className="link">
                    <Button color="primary">Details</Button>
                </Link>
            </TableCell>
        </TableRow>
    );
}

export default EventDetails