import React, { useLayoutEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {
    Container,
    CircularProgress,
    Grid
} from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from "react-i18next";
import { useListStyles } from '../../../styles/eventListStyles';
import ErrorIcon from "@material-ui/icons/Error";
import {Ticket} from "../../../model/Ticket";
import TicketDetailsDumb from "./TicketDetailsDumb";


interface Props {
    isError: boolean,
    isLoading: boolean,
    ticketsDetails: Ticket[];
}


const TicketListDumb = (props: Props) => {
    const classes = useListStyles()

    const [width, setWidth] = useState(window.innerWidth);
    const [t] = useTranslation();

    const ticketsDetails = props.ticketsDetails;
    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
            <Container>

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
                                        <TableCell key={"id"} align={"left"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.id")}
                                        </TableCell>

                                        <TableCell key={"date"} align={"left"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.date")}
                                        </TableCell>

                                        <TableCell key={"category"} align={"left"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.category")}
                                        </TableCell>

                                        <TableCell key={"name"} align={"left"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.name")}
                                        </TableCell>

                                        <TableCell key={"pdf"} align={"left"}
                                                   padding={"default"} size={"medium"}>
                                            {t("ticketList.pdf")}
                                        </TableCell>

                                        <TableCell/>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        ticketsDetails.map((ticket: Ticket) => {
                                            return <TicketDetailsDumb ticket={ticket}/>
                                        })
                                    }
                                </TableBody>
                            </Table>
                    }
                </TableContainer>
            </Container>
        );
}

export default TicketListDumb;