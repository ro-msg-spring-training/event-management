import React from 'react';
import { Button } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import { Ticket } from "../../../model/Ticket";
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
    ticket: Ticket;
}

const TicketDetailsDumb = (props: Props) => {
    const commonClasses = useStyles()
    const [t] = useTranslation();

    const id = props.ticket.bookingId;
    const date = props.ticket.bookingDate;
    const eventName = props.ticket.eventName;
    const category = props.ticket.ticketCategory;
    const name = props.ticket.name;
    const pdfUrl = props.ticket.pdfUrl;

    return (
        <StyledTableRow>
            <StyledTableCell
                key={"id"} align={"center"}
                padding={"default"} size={"small"}>{id}
            </StyledTableCell>
            <StyledTableCell
                key={"date"} align={"center"}
                padding={"default"} size={"small"}>{date}
            </StyledTableCell>
            <StyledTableCell
                key={"eventName"} align={"center"}
                padding={"default"} size={"small"}>{eventName}
            </StyledTableCell>
            <StyledTableCell
                key={"category"} align={"center"}
                padding={"default"} size={"small"}>{category}
            </StyledTableCell>
            <StyledTableCell
                key={"name"} align={"center"}
                padding={"default"} size={"small"}>{name}
            </StyledTableCell>

            <StyledTableCell key={"pdfUrl"} align={"center"}
                             padding={"default"} size={"medium"}>
                <Link to={pdfUrl} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.open")}
                    </Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default TicketDetailsDumb