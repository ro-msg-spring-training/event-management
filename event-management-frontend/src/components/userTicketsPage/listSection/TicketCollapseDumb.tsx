import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import {Ticket} from "../../../model/Ticket";
import {Link} from "react-router-dom";
import {Button, TableBody } from "@material-ui/core";
import {useStyles} from "../../../styles/CommonStyles";
import {useStylesTickets} from "../../../styles/ticketsListStyles";
import {useTranslation} from "react-i18next";


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);


interface Props {
    ticket: Ticket;
}

const TicketCollapseDumb = (props: Props) => {

    const commonClasses = useStyles()
    const classes = useStylesTickets()

    const ticket = props.ticket;

    const [t] = useTranslation();

    return (
        <TableBody>
            <TableRow>
                <StyledTableCell className={classes.tableCellPadding}/>
                <StyledTableCell className={classes.tableCellPadding}
                    key={"date"} align={"center"}
                    padding={"default"} size={"small"}>{ticket.bookingDate}
                </StyledTableCell>
                <StyledTableCell className={classes.tableCellPadding}
                    key={"eventName"} align={"center"}
                    padding={"default"} size={"small"}>{ticket.eventName}
                </StyledTableCell>
                <StyledTableCell
                    key={"category"} align={"center"}
                    padding={"default"} size={"small"}
                    className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}>{ticket.ticketCategory}
                </StyledTableCell>
                <StyledTableCell
                    key={"name"} align={"center"}
                    padding={"default"} size={"small"}
                    className={`${classes.ticketColumnMobile} ${classes.tableCellPadding}`}>{ticket.name}
                </StyledTableCell>

                <StyledTableCell key={"pdfUrl"} align={"center"}
                                 size={"medium"} className={`${classes.pdfButton} ${classes.tableCellPadding}`}>
                    <Link to={ticket.pdfUrl} className={classes.linkDecoration}>
                        <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                            {t("eventList.open")}
                        </Button>
                    </Link>
                </StyledTableCell>
            </TableRow>
        </TableBody>
    );
}

export default TicketCollapseDumb