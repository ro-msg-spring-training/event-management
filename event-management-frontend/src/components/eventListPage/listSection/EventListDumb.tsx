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
import FilterSectionSmart from "../filterSection/FilterSectionSmart";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { useListStyles } from '../../../styles/EventListStyles';
import { EventSort } from '../../../model/EventSort';
import { EventFilters } from '../../../model/EventFilters';
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
    sort: EventSort;
    filters: EventFilters;
    page: number;
    lastPage: number;
    updateSortCriteria: (sortCriteria: { criteria: string, type: string }) => void;
    incrementPage: () => void;
    decrementPage: () => void;

    eventsDetails: any[];
    eventsDetailsMobile: any[];
    handleSortEvent: (criteria: string, type: string) => void;
    goToPrevPage: () => void;
    goToNextPage: () => void;
}

interface Data {
    title: string;
    subtitle: string;
    location: string;
    date: number;
    hour: number;
    occRate: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const EventListDumb = (props: Props) => {
    const commonClasses = useStyles()
    const classes = useListStyles()


    const eventsDetails = props.eventsDetails;
    const eventsDetailsMobile = props.eventsDetailsMobile;
    const goToPrevPage = props.goToPrevPage;
    const goToNextPage = props.goToNextPage;

    const page = props.page;
    const lastPage = props.lastPage;

    const [expanded, setExpanded] = useState(false)
    const [width, setWidth] = useState(window.innerWidth);
    const [t] = useTranslation();

    const stickyDiv: React.RefObject<HTMLInputElement> = React.createRef()

    const headCells: HeadCell[] = [
        { id: 'date', numeric: true, disablePadding: false, label: t("eventList.date") },
        { id: 'hour', numeric: true, disablePadding: false, label: t("eventList.hour") },
        { id: 'occRate', numeric: true, disablePadding: false, label: t("eventList.occupancyRate") + " (%) " },
    ];

    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        event.preventDefault();
        let type = ""
        if (props.sort.type === "asc") {
            type = "desc";
        } else {
            type = "asc"
        }
        props.updateSortCriteria({ criteria: property, type: type })
    }

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    useScrollPosition(
        ({ prevPos, currPos }) => {

            // compute the height of the sticky area
            const elementHeight = stickyDiv.current ? stickyDiv.current.offsetHeight : 0

            // get the maximum value between sticky area height and window height
            const height = elementHeight < window.outerHeight ? elementHeight : window.outerHeight

            // collapse on scrolling up or on a quick scroll down
            if ((prevPos.y > currPos.y + height) || (prevPos.y < currPos.y)) {
                setExpanded(false)
            }
        },
        [expanded],
        undefined,
        false,
        300
    )


    if (width <= 600) {
        return (
            <TableContainer component={Paper}>
                <Link to={`/admin/newEvent`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>{t("eventList.createNewEventButton")}</Button>
                </Link>

                <FilterSectionSmart expanded={expanded} setExpanded={setExpanded} />

                {props.isError ?
                    <Grid container alignItems={"center"} justify={"center"}>
                        <br /><br /><br /><br /><br /><ErrorIcon color={"primary"} fontSize={"large"} />
                        Oops, there was an error
                    </Grid> :
                        props.isLoading ?
                            <Grid container alignItems={"center"} justify={"center"}>
                                <br /><br /><br /><br /><br /><CircularProgress />
                            </Grid> :

                        <Table aria-label="customized table" className={commonClasses.left}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{t("eventList.title")}</StyledTableCell>
                                    <StyledTableCell
                                        sortDirection={props.sort.criteria === 'date' ? props.sort.type as "asc" | "desc" | undefined : false}>
                                        <TableSortLabel
                                            hideSortIcon={true}
                                            active={props.sort.criteria === 'date'}
                                            direction={props.sort.criteria === 'date' ? props.sort.type as "asc" | "desc" | undefined : 'asc'}
                                            onClick={createSortHandler('date')}>
                                            {props.sort.criteria === 'date' ? (
                                                <span className={`${commonClasses.visuallyHidden}`}>
                                            {props.sort.type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                            ) : null}
                                            {t("eventList.date")}
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell/>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {eventsDetailsMobile}
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    {page > 1 ?
                                        <PaginationCell>
                                            <Button onClick={props.decrementPage}
                                                    style={{color: "#F9C929"}}><b>&laquo;&laquo;</b></Button>
                                        </PaginationCell> :
                                        <PaginationCell/>
                                    }
                                    <PaginationCell
                                        style={{textAlign: "center"}}>{page + "/" + lastPage}</PaginationCell>
                                    {page < lastPage ?
                                        <PaginationCell>
                                            <Button onClick={props.incrementPage}
                                                    style={{color: "#F9C929"}}><b>&raquo;&raquo;</b></Button>
                                        </PaginationCell> :
                                        <PaginationCell/>
                                    }
                                </TableRow>
                            </TableFooter>
                        </Table>
                }
            </TableContainer>
        );
    } else {
        return (
            <Container>
                <TableContainer component={Paper} className={classes.pageContainer}>
                    <div
                        className={classes.stickyArea}
                        ref={stickyDiv}>

                        <Link to={`/admin/newEvent`} style={{ textDecoration: 'none' }}>
                            <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>{t("eventList.createNewEventButton")}</Button>
                        </Link>

                        <FilterSectionSmart expanded={expanded} setExpanded={setExpanded} />
                    </div>

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
                                            <TableCell key={"title"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.title")}</TableCell>
                                            <TableCell key={"subtitle"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.subtitle")}</TableCell>
                                            <TableCell key={"location"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.location")}</TableCell>

                                            {headCells.map((headCell) => (
                                                <TableCell
                                                    key={headCell.id}
                                                    align={'left'}
                                                    padding={headCell.disablePadding ? 'none' : 'default'}
                                                    sortDirection={props.sort.criteria === headCell.id && headCell.numeric ? props.sort.type as "asc" | "desc" | undefined : false}
                                                    size={"medium"}>

                                                    <TableSortLabel
                                                        hideSortIcon={!headCell.numeric}
                                                        active={props.sort.criteria === headCell.id && headCell.numeric}
                                                        direction={props.sort.criteria === headCell.id ? props.sort.type as "asc" | "desc" | undefined : 'asc'}
                                                        onClick={createSortHandler(headCell.id)}>

                                                        {headCell.label}

                                                        {
                                                            props.sort.criteria === headCell.id && headCell.numeric ?
                                                                (
                                                                    <span className={`${commonClasses.visuallyHidden}`} >
                                                                        {props.sort.type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                    </span>
                                                                ) : null
                                                        }
                                                    </TableSortLabel>
                                                </TableCell>
                                            ))}
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            eventsDetails
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            {page > 1 ?
                                                <PaginationCell>
                                                <Button onClick={goToPrevPage} style={{color: "#f2ac0a"}}><b>&laquo;{t("eventList.previous")}</b></Button>
                                                </PaginationCell> :
                                                <PaginationCell/>
                                            }
                                            <PaginationCell />
                                            <PaginationCell />
                                            <PaginationCell>{page + "/" + lastPage}</PaginationCell>
                                            <PaginationCell />
                                            <PaginationCell />
                                            {page < lastPage ?
                                                <PaginationCell>
                                                    <Button onClick={goToNextPage}
                                                            style={{color: "#f2ac0a"}}><b>{t("eventList.next")}&raquo;</b></Button>
                                                </PaginationCell> :
                                                <PaginationCell/>
                                            }
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                    }
                </TableContainer>
            </Container>
        );
    }
}

export default EventListDumb;