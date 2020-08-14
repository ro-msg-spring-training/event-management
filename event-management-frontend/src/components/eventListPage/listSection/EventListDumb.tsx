import React, {useEffect, useLayoutEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {Button, TableFooter, TableSortLabel } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import FilterSectionSmart from "../filterSection/FilterSectionSmart";
import { useStyles } from '../../../styles/CommonStyles';
import {EventSortProps} from "../../../types/EventSortProps";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";

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
    eventsDetails: any[];
    eventsDetailsMobile: any[];
    handleSortEvent: (criteria: string, type: string) => void;
    sort: EventSortProps;
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

const headCells: HeadCell[] = [
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'hour', numeric: true, disablePadding: false, label: 'Hour' },
    { id: 'occRate', numeric: true, disablePadding: false, label: 'Occupancy rate' },
];


const EventListDumb = (props: Props) => {
    const commonClasses = useStyles()

    const eventsDetails = props.eventsDetails;
    const eventsDetailsMobile = props.eventsDetailsMobile;
    const handleSortEvent = props.handleSortEvent;
    const sort = props.sort;
    const goToPrevPage = props.goToPrevPage;
    const goToNextPage = props.goToNextPage;

    const [criteria, setCriteria] = useState();
    const [type, setType] = useState();
    const [width, setWidth] = useState(window.innerWidth);

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        setCriteria(property);
        if (type === "asc") {
            setType("desc");
        } else {
            setType("asc");
        }
    };

    useEffect(() => {
        handleSortEvent(criteria, type);
    }, [criteria, type, handleSortEvent]);

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

        if (width <= 600) {
            return (
                <TableContainer component={Paper}>
                    <Link to={`/newEvent`} style={{ textDecoration: 'none' }}>
                        <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>Create new event</Button>
                    </Link>
                    <br/><br/>
                    <FilterSectionSmart/>
                    <br/>
                    <Table aria-label="customized table" className={commonClasses.left}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell sortDirection={criteria === 'date' ? type : false}>
                                    <TableSortLabel
                                        hideSortIcon={true}
                                        active={criteria === 'date' && sort.criteria !== ""}
                                        direction={criteria === 'date' ? type : 'asc'}
                                        onClick={createSortHandler('date')}>
                                        {criteria === 'date' ? (
                                            <span className={`${commonClasses.visuallyHidden}`} >
                                                {type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                        ) : null}
                                        {'Date'}
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
                                <PaginationCell>
                                    <Button onClick={goToPrevPage} color={"secondary"}><b>&laquo; Prev</b></Button>
                                </PaginationCell>
                                <PaginationCell/>
                                <PaginationCell>
                                    <Button onClick={goToNextPage} color={"secondary"}><b>Next &raquo;</b></Button>
                                </PaginationCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            );
        } else {
            return (
                <TableContainer component={Paper}>
                    <Link to={`/newEvent`} style={{ textDecoration: 'none' }}>
                        <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>Create new event</Button>
                    </Link>
                    <br/><br/>
                    <FilterSectionSmart/>
                    <br/>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell key={"title"} align={"left"} padding={"default"} size={"medium"}>Title</TableCell>
                                <TableCell key={"subtitle"} align={"left"} padding={"default"} size={"medium"}>Subtitle</TableCell>
                                <TableCell key={"location"} align={"left"} padding={"default"} size={"medium"}>Location</TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={criteria === headCell.id && headCell.numeric ? type : false}
                                        size={"medium"}
                                    >
                                        <TableSortLabel
                                            hideSortIcon={!headCell.numeric}
                                            active={criteria === headCell.id && headCell.numeric && sort.criteria !== ""}
                                            direction={criteria === headCell.id ? type : 'asc'}
                                            onClick={createSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {criteria === headCell.id && headCell.numeric ? (
                                                <span className={`${commonClasses.visuallyHidden}`} >
                                                {type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {eventsDetails}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <PaginationCell>
                                    <Button onClick={goToPrevPage} color={"secondary"}><b>&laquo;Prev</b></Button>
                                </PaginationCell>
                                <PaginationCell/>
                                <PaginationCell/>
                                <PaginationCell/>
                                <PaginationCell/>
                                <PaginationCell/>
                                <PaginationCell>
                                    <Button onClick={goToNextPage} color={"secondary"}><b>Next&raquo;</b></Button>
                                </PaginationCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            );
        }
}

export default EventListDumb;