import React from 'react';
import {Button, Collapse, Typography} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import { Ticket } from "../../../model/Ticket";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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
    handleChange: any;
    ticket: any;
    open: any;
    index: number;
}

const TicketGroupDumb = (props: Props) => {
    const commonClasses = useStyles()
    const classes = useStylesTickets()
    const [t] = useTranslation();

    const tickets = props.ticket;
    const index = props.index;
    const firstElement: Ticket = tickets[0]
    tickets.shift()

    const id = firstElement.bookingId;
    const date = firstElement.bookingDate;
    const eventName = firstElement.eventName;
    const category = firstElement.ticketCategory;
    const name = firstElement.name;
    const pdfUrl = firstElement.pdfUrl;
    const handleChange = props.handleChange;
    const open = props.open;
    console.log("here", open)

    return (
        <React.Fragment>
            <StyledTableRow>
                <TableCell>
                    <IconButton type="button" aria-label="expand row" size="small" onClick={() => handleChange(index)}>
                        {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
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
                    padding={"default"} size={"small"}
                    className={classes.ticketColumnMobile}>{category}
                </StyledTableCell>
                <StyledTableCell
                    key={"name"} align={"center"}
                    padding={"default"} size={"small"}
                    className={classes.ticketColumnMobile}>{name}
                </StyledTableCell>

                <StyledTableCell key={"pdfUrl"} align={"center"}
                                 size={"medium"} className={classes.pdfButton}>
                    <Link to={pdfUrl} className={classes.linkDecoration}>
                        <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                            {t("eventList.open")}
                        </Button>
                    </Link>
                </StyledTableCell>
            </StyledTableRow>

            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <TableRow>
                    <TableCell colSpan={7}>
                        {tickets.map((ticket: Ticket) => { return ticket.name })}
                    </TableCell>
                </TableRow>
            </Collapse>
        </React.Fragment>
    );
}

export default TicketGroupDumb