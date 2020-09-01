import React, {FormEvent} from 'react'
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useStyles} from "../../../styles/CommonStyles";
import {useUserFilterStyles} from "../../../styles/userEventsPage/UserFilterStyle";
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

const UserTicketsFilterDumb = ({isExpanded, filters, errorDate, updateFilters,
                                   toggle, clear, submitForm, handleChangeTitle, handleChangeDate}: Props) => {
    const commonClasses = useStyles();
    const filterStyle = useUserFilterStyles();
    const [t] = useTranslation();

    return (
        <Paper className={filterStyle.root}>
            <form onSubmit={event => submitForm(event)} className={filterStyle.filterArea}>
                <Grid container spacing={3} className={filterStyle.filterArea} >
                    <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} xl={6} >
                            <TextField
                                name='title'
                                value={filters.title}
                                label={t("eventList.title")}
                                variant='outlined'
                                fullWidth
                                onChange={(e) => handleChangeTitle(e.target.value)}
                                className={filterStyle.textOverflow}/>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} xl={6} >
                            <TextField
                                name='date'
                                type="date"
                                error={errorDate !== ''}
                                label={t("eventList.date")}
                                variant='outlined'
                                fullWidth
                                helperText={errorDate}
                                value={moment(filters.date ? filters.date : Date.now()).format("YYYY-MM-DD")}
                                onChange={(e) => handleChangeDate(e.target.value)}
                                className={filterStyle.textOverflow}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={10} md={12} xl={12} container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} xl={6}>
                            <Button
                                className={`${commonClasses.buttonStyle2} 
                                ${commonClasses.buttonStyle3} 
                                ${filterStyle.filterButtons}`}
                                onClick={clear}>
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