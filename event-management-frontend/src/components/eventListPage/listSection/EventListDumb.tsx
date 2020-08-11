import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {Button, TablePagination, Typography} from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import {Link} from "react-router-dom";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import FilterSectionSmart from "../filterSection/FilterSectionSmart";
import { useStyles } from '../../../styles/CommonStyles';


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
        head: {
            backgroundColor: '#F4F5F9',
            color: '#F2AE30',
            fontSize: 18,
        },
    }),
)(TableCell);

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
}

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
    const handleSort = props.handleSort;

        return (
            <TableContainer component={Paper}>
                <Typography variant="h3" className={`${commonClasses.eventTitle}`}>Events</Typography>
                <Link to={`/newEvent`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>Create new event</Button>
                </Link>
                <br/><br/>
                <FilterSectionSmart></FilterSectionSmart>
                <br/>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell><div onClick={() => handleSort("title")}>Title</div></StyledTableCell>
                            <StyledTableCell>Subtitle</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Hour</StyledTableCell>
                            <StyledTableCell>Occupancy rate</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
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