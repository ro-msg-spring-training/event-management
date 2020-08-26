import React, {useEffect, useRef} from 'react';
import { Button } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import { Ticket } from "../../../model/Ticket";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useStylesTickets } from '../../../styles/ticketsListStyles';
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TicketGroupDumb from "./TicketGroupDumb";
import {AppState} from "../../../store/store";
import {connect} from "react-redux";
import {openDetails, closeDetails} from "../../../actions/TicketsPageActions";

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

interface Props {
    ticket: any;
    open: boolean;
    openDetails: () => void;
    closeDetails: () => void;
    handleChange: () => void;
}

const TicketGroupSmart = (props: Props) => {

    const handleChange = props.handleChange;
    return (
      <>pa</>
    );
}

const mapStateToProps = (state: AppState) => ({
//    open: state.tickets.open,
});

export default connect(mapStateToProps,
    { openDetails, closeDetails })(TicketGroupSmart)