import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Container, CircularProgress, Grid } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from "react-i18next";
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import ErrorIcon from "@material-ui/icons/Error";
import {Ticket} from "../../../model/Ticket";
import TicketDetailsDumb from "./TicketDetailsDumb";
import Typography from "@material-ui/core/Typography";


interface Props {
    isError: boolean,
    isLoading: boolean,
    ticketsDetails: Ticket[];
}

const TicketListDumb = (props: Props) => {
    const classes = useStylesTickets()
    const [t] = useTranslation();

    const ticketsDetails = props.ticketsDetails;

    return (
            <div className={`${classes.pageContainer} ticketResponsive`}>
                <Typography className={classes.ticketsTitle}>{t("ticketList.myTickets")}</Typography>
                <TableContainer component={Paper} className={classes.pageContainer}>

                    { props.isError ?
                        <Grid container alignItems={"center"} justify={"center"}>
                            <ErrorIcon color={"primary"} fontSize={"large"} />
                            Oops, there was an error
                        </Grid> :

                        props.isLoading ?
                            <Grid container alignItems={"center"} justify={"center"}>
                                <CircularProgress />
                            </Grid> :

                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell key={"id"} align={"center"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.id")}
                                        </TableCell>

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

                                <TableBody>
                                    {
                                        ticketsDetails.map((ticket: Ticket) => {
                                            return <TicketDetailsDumb key={ticket.bookingId} ticket={ticket} />
                                        })
                                    }
                                </TableBody>
                            </Table>
                    }
                </TableContainer>
            </div>
        );
}

export default TicketListDumb