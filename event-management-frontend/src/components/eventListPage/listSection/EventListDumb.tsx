import React, {useState} from 'react';
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


type Order = 'asc' | 'desc';
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
    orderBy: string;
    order: Order;
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
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'subtitle', numeric: false, disablePadding: false, label: 'Subtitle' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
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
    const orderBy = props.orderBy;
    const order = props.order;

    const [criteria, setCriteria] = useState(orderBy);
    const [type, setType] = useState(order);

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        setCriteria(property);
        if (type === "asc") {
            setType("desc");
        } else {
            setType("asc");
        }
    };

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
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={headCell.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === headCell.id && headCell.numeric ? order : false}
                                    size={"medium"}
                                >
                                    <TableSortLabel
                                        hideSortIcon={!headCell.numeric}
                                        active={criteria === headCell.id && headCell.numeric}
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


/*<StyledTableCell><div onClick={() => handleSort("title")}>Title</div></StyledTableCell>
                            <StyledTableCell>Subtitle</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Hour</StyledTableCell>
                            <StyledTableCell>Occupancy rate</StyledTableCell>
                            <StyledTableCell><TableSortLabel>
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            </TableSortLabel></StyledTableCell>


                            */