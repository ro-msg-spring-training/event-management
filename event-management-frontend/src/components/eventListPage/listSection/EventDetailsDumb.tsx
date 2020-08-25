import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import { Event } from "../../../model/Event";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";


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

interface Props {
    event: Event;
}

const EventDetailsDumb = (props: Props) => {
    const commonClasses = useStyles()
    const [t] = useTranslation();

    const id = props.event.id;
    const title = props.event.title;
    const subtitle = props.event.subtitle;
    const location = props.event.location;
    const date = props.event.startDate;
    const hour = props.event.startHour;
    const occRate = props.event.occupancyRate;

    return (
        <StyledTableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell>{subtitle}</StyledTableCell>
            <StyledTableCell>{location}</StyledTableCell>
            <StyledTableCell>{date}</StyledTableCell>
            <StyledTableCell>{hour}</StyledTableCell>
            <StyledTableCell>{occRate}</StyledTableCell>

            <StyledTableCell>
                <Link to={`/admin/events/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.details")}
                    </Button>
                </Link><br/><br/>
                <Link to={`/admin/validate/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.validate")}
                    </Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default EventDetailsDumb