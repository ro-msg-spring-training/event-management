import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {Button, TablePagination, TableSortLabel, Typography} from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from "@material-ui/core/TableFooter";
import {Link} from "react-router-dom";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import FilterSectionSmart from "../filterSection/FilterSectionSmart";
import { useStyles } from '../../../styles/CommonStyles';
import {EventSortProps} from "../../../types/EventSortProps";


interface Props {
    emptyRows: number;
    rowsPerPage: number;
    eventsDetailsSlice: any[];
    eventsDetails: any[];
    rows: number;
    page: number;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => void
    handleSort: (column: string) => void;
    handleSortEvent: (criteria: string, type: string) => void;
    sort: EventSortProps;
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

    const emptyRows = props.emptyRows;
    const rowsPerPage = props.rowsPerPage;
    const eventsDetailsSlice = props.eventsDetailsSlice;
    const eventsDetails = props.eventsDetails;
    const rows = props.rows;
    const page = props.page;
    const handleChangePage = props.handleChangePage;
    const handleChangeRowsPerPage = props.handleChangeRowsPerPage;
    const handleSortEvent = props.handleSortEvent;
    const sort = props.sort;

    const [criteria, setCriteria] = useState();
    const [type, setType] = useState();

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

        return (
            <TableContainer component={Paper}>
                <Typography variant="h3" className={`${commonClasses.eventTitle}`}>Events</Typography>
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
                        {(rowsPerPage > 0 ?
                            eventsDetailsSlice : eventsDetails)}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 70 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={rows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>

                </Table>
            </TableContainer>
        );
}

export default EventListDumb;