import React, { useLayoutEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {
    Button,
    Container,
    TableFooter,
    TableSortLabel,
    CircularProgress,
    Grid
} from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { useListStyles } from '../../../styles/eventListStyles';
import ErrorIcon from "@material-ui/icons/Error";


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
            padding: 10,
        },
    }),
)(TableCell);

const PaginationCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 50,
            padding: 10,
        },
    }),
)(TableCell);

interface Props {
    isError: boolean,
    isLoading: boolean,
    ticketsDetails: any[];
}


const TicketListDumb = (props: Props) => {
    const commonClasses = useStyles()
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
                            <br /><br /><br /><br /><br /><ErrorIcon color={"primary"} fontSize={"large"} />
                            Oops, there was an error
                        </Grid> :
                        props.isLoading ?
                            <Grid container alignItems={"center"} justify={"center"}>
                                <br /><br /><br /><br /><br /><CircularProgress />
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
                                    {ticketsDetails}
                                </TableBody>
                            </Table>
                    }
                </TableContainer>
            </Container>
        );
}

export default TicketListDumb;