import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import MobileEvent from "../../../model/MobileEvent";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";
import {Event} from "../../../model/Event";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
            padding: 20,
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

const EventDetailsMobileDumb = (props: Props) => {
    const commonClasses = useStyles()
    const [t] = useTranslation()

    const id = props.event.id;
    const title = props.event.title;
    const date = props.event.startDate;

    return (
        <StyledTableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell>{date}</StyledTableCell>

            <StyledTableCell>
                <Link to={`/admin/events/${id}`} style={{ textDecoration: 'none'}}>
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

export default EventDetailsMobileDumb