import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import Event from "../../../model/Event";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';


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

const EventDetailsDumb = (props: Event) => {
    const commonClasses = useStyles()

    const id = props.id;
    const title = props.name;
    const subtitle = props.subtitle;
    const location = props.location;
    const date = props.date;
    const hour = props.hour;
    const occRate = props.occRate;

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
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>Details</Button>
                </Link><br/><br/>
                <Link to={`/validate/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>Validate</Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

//TODO: pagination for fronted (integrate after with backend)
//TODO: gmail address instead of MyAccount
//TODO: active header
//TODO: fewer column (get rid of subtitle, hour and occupancy rate) for mobile

export default EventDetailsDumb