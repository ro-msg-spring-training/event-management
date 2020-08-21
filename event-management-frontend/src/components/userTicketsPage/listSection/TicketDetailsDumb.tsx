import React from 'react';
import { Button } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import Ticket from "../../../model/Ticket";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(even)': {
                backgroundColor: '#F4F5F9',
            },
        },
    }),
)(TableRow);

const TicketDetailsDumb = (props: Ticket) => {
    const commonClasses = useStyles()
    const [t] = useTranslation();
    const id = props.id;
    const date = props.date;
    const category = props.category;
    const name = props.name;

    return (
        <StyledTableRow>
            <StyledTableCell>{id}</StyledTableCell>
            <StyledTableCell>{date}</StyledTableCell>
            <StyledTableCell>{category}</StyledTableCell>
            <StyledTableCell>{name}</StyledTableCell>

            <StyledTableCell>
                <Link to={`/pdf/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.open")}
                    </Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default TicketDetailsDumb