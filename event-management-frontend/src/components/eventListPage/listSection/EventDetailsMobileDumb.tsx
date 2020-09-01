import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from "react-i18next";
import {Event} from "../../../model/Event";
import {StyledTableCell} from "../../../styles/StyledTableCell";
import {StyledTableRow} from "../../../styles/StyledTableRow";


interface Props {
    event: Event;
}

const EventDetailsMobileDumb = (props: Props) => {
    const commonClasses = useStyles()
    const [t] = useTranslation()

    const id = props.event.id;
    const title = props.event.title;
    const date = props.event.startDate;

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