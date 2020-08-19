import React from 'react';
import {Button} from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
import MobileEvent from "../../../model/MobileEvent";
import {createStyles, Theme, withStyles} from "@material-ui/core/styles";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        body: {
            fontSize: 14,
            padding: 20,
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

const EventDetailsMobileDumb = (props: MobileEvent) => {
    const commonClasses = useStyles()
    const [t] = useTranslation()

    const id = props.id;
    const title = props.name;
    const date = props.name;

    return (
        <StyledTableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell>{date}</StyledTableCell>

            <StyledTableCell>
                <Link to={`/admin/events/${id}`} style={{ textDecoration: 'none'}}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.details")}
                    </Button>
                </Link><br/><br/>
                <Link to={`/admin/validate/${id}`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        {t("eventList.validate")}
                    </Button>
                </Link>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default EventDetailsMobileDumb