import React from 'react';
import {Box, Button, Collapse, TableHead} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import { Ticket } from "../../../model/Ticket";
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TicketCollapseDumb from "./TicketCollapseDumb";
import {StyledTableCell} from '../../../styles/StyledTableCell'
import {ReactComponent} from "*.svg";


interface Props {
    handleChange: (index: number) => void;
    ticket: any;
    open: Array<boolean>;
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
    // const pdfUrl = firstElement.pdfUrl;
    const handleChange = props.handleChange;
    const open = props.open;

    // TODO: when backend done, add link to PDFs here
    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton type="button"  size="small" onClick={() => handleChange(index)}>
                        {open[index] === undefined || !open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
                    <Link to={''} className={classes.linkDecoration}>
                        <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                            {t("eventList.open")}
                        </Button>
                    </Link>
                </StyledTableCell>
            </TableRow>

            <Collapse in={open[index]} timeout={0} unmountOnExit>
                <Box className={classes.paddingTable} component={'table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell/>

                            <TableCell key={"date"} align={"center"}
                                       padding={"default"} size={"medium"}>
                                {t("ticketList.date")}
                            </TableCell>

                            <TableCell key={"eventName"} align={"center"}
                                       padding={"default"} size={"medium"}>
                                {t("ticketList.eventName")}
                            </TableCell>

                            <TableCell key={"category"} align={"center"}
                                       padding={"default"} size={"medium"}
                                       className={classes.ticketColumnMobile}>
                                {t("ticketList.category")}
                            </TableCell>

                            <TableCell key={"name"} align={"center"}
                                       padding={"default"} size={"medium"}
                                       className={classes.ticketColumnMobile}>
                                {t("ticketList.name")}
                            </TableCell>

                            <TableCell key={"pdf"} align={"center"}
                                       padding={"default"} size={"medium"}>
                                {t("ticketList.pdf")}
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {tickets.map((ticket: Ticket) => {
                        return <TicketCollapseDumb ticket={ticket} key={ticket.ticketId}/>
                    })}
                </Box>
            </Collapse>
        </>
    );
}


export default TicketGroupDumb
