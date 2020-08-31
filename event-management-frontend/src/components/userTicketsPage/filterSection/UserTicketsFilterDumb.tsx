import React, {FormEvent, KeyboardEvent} from 'react'
import {Button, Collapse, Grid, Paper, TextField} from "@material-ui/core";
import {useStyles} from "../../../styles/CommonStyles";
import {useUserFilterStyles} from "../../../styles/userEventsPage/UserFilterStyle";
import {useStylesTickets} from "../../../styles/ticketsListStyles";
import { useFilterStyles } from '../../../styles/FilterStyles';
import {useTranslation} from "react-i18next";
import moment from 'moment';
import {TicketFilters} from "../../../model/TicketFilters";


interface Props {
    isExpanded: boolean,
    filters: TicketFilters,
    errorDate: string,
    updateFilters: (filters: TicketFilters) => void,
    toggle: () => void,
    clear: () => void,
    submitForm: (event: FormEvent<HTMLFormElement>) => void,
    handleChangeTitle: (title: string) => void,
    handleChangeDate: (startDate: string) => void,
}

const UserTicketsFilterDumb = (props: Props) => {
    const commonClasses = useStyles();
    const filterStyle = useUserFilterStyles();
    const ticketStyle = useStylesTickets();
    const classes = useFilterStyles();
    const [t] = useTranslation();

    return (
        <Paper className={filterStyle.root}>
            <form onSubmit={event => props.submitForm(event)} className={filterStyle.filterArea}>
                <Grid container spacing={3} className={filterStyle.filterArea} >
                    <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} xl={6} >
                            <TextField
                                name='title'
                                value={props.filters.title}
                                label={t("eventList.title")}
                                variant='outlined'
                                fullWidth
                                onChange={(e) => props.handleChangeTitle(e.target.value)}
                                className={filterStyle.textOverflow}/>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} xl={6} >
                            <TextField
                                name='date'
                                type="date"
                                error={props.errorDate !== ''}
                                label={t("eventList.date")}
                                variant='outlined'
                                fullWidth
                                helperText={props.errorDate}
                                value={moment(props.filters.date ? props.filters.date : Date.now()).format("YYYY-MM-DD")}
                                onChange={(e) => props.handleChangeDate(e.target.value)}
                                className={filterStyle.textOverflow}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} xl={6}>
                            <Button
                                className={`${commonClasses.buttonStyle2} 
                                ${commonClasses.buttonStyle3} 
                                ${filterStyle.filterButtons}`}
                                onClick={props.clear}>
                                {t("eventList.clearButton")}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} xl={6}>
                            <Button
                                className={`${commonClasses.buttonStyle2} 
                                ${commonClasses.buttonStyle3} 
                                ${filterStyle.filterButtons}`}
                                type='submit'>
                                {t("eventList.filterButton")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}


export default UserTicketsFilterDumb