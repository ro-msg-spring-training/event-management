import React, { FormEvent, KeyboardEvent } from 'react';
import { Grid, TextField, Button, MenuItem, FormControlLabel, InputAdornment, Collapse } from '@material-ui/core'
import "react-datepicker/dist/react-datepicker.css";
import { MathRelation } from '../../../model/MathRelation';
import { useStyles } from '../../../styles/CommonStyles';
import { EventFilters } from '../../../model/EventFilters';
import { useTranslation } from "react-i18next";
import { YellowCheckbox } from '../../YellowCheckbox';
import moment from 'moment';
import { useFilterStyles } from '../../../styles/FilterStyles';


interface Props {
    isExpanded: boolean,
    filters: EventFilters,
    errorRate: string,
    errorMaxPeople: string,
    errorEndDate: string,
    errorStartDate: string,
    errorStartHour: string,
    errorEndHour: string,
    resetFilters: () => void,
    updateFilters: (filters: EventFilters) => void,
    toggle: () => void,
    submitForm: (event: FormEvent<HTMLFormElement>) => void,
    restrictNumberInput: (event: KeyboardEvent<HTMLDivElement>) => void
    handleChangeTitle: (title: string) => void,
    handleChangeSubtitle: (subtitle: string) => void,
    handleChangeLocation: (location: string) => void,
    handleChangeStatus: (status: string) => void,
    handleChangeHighlighted: (highlighted: boolean) => void,
    handleChangeStartHour: (startHour: string) => void,
    handleChangeEndHour: (endHour: string) => void,
    handleChangeMaxPeople: (maxPeople: string) => void,
    handleChangeMaxPeopleSign: (maxPeopleSign: MathRelation) => void,
    handleChangeRate: (rate: string) => void,
    handleChangeRateSign: (rateSign: MathRelation) => void,
    handleChangeStartDate: (startDate: string) => void,
    handleChangeEndDate: (startDate: string) => void
}

function FilterSectionDumb(props: Props) {
    const classes = useFilterStyles()
    const commonClasses = useStyles()

    const [t] = useTranslation();

    return (
        <form onSubmit={event => props.submitForm(event)} className={classes.filterArea}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9} md={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t("eventList.title")}
                                value={props.filters.title}
                                onChange={(e) => props.handleChangeTitle(e.target.value)}
                                fullWidth
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t("eventList.subtitle")}
                                value={props.filters.subtitle}
                                onChange={(e) => props.handleChangeSubtitle(e.target.value)}
                                fullWidth
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t("eventList.location")}
                                value={props.filters.location}
                                onChange={(e) => props.handleChangeLocation(e.target.value)}
                                fullWidth
                                variant="outlined" />
                        </Grid>

                    </Grid>

                    <Collapse in={props.isExpanded} timeout={500} className={classes.collapseArea}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    type="date"
                                    error={props.errorStartDate !== ''}
                                    label={t("eventList.startDate")}
                                    helperText={props.errorStartDate}
                                    value={moment(props.filters.startDate ? props.filters.startDate : Date.now()).format("YYYY-MM-DD")}
                                    onChange={(e) => props.handleChangeStartDate(e.target.value)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    variant="outlined"
                                    type="date"
                                    value={moment(props.filters.endDate ? props.filters.endDate : Date.now()).format("YYYY-MM-DD")}
                                    onChange={(e) => props.handleChangeEndDate(e.target.value)}
                                    error={props.errorEndDate !== ''}
                                    label={t("eventList.endDate")}
                                    helperText={props.errorEndDate}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={2}>
                                <TextField
                                    error={props.errorStartHour !== ''}
                                    label={t("eventList.startHour")}
                                    helperText={props.errorStartHour}
                                    variant="outlined"
                                    type="time"
                                    value={props.filters.startHour ? props.filters.startHour : '00:00'}
                                    onChange={(e) => props.handleChangeStartHour(e.target.value)} fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={2}>
                                <TextField
                                    error={props.errorEndHour !== ''}
                                    label={t("eventList.endHour")}
                                    helperText={props.errorEndHour}
                                    variant="outlined"
                                    type="time"
                                    value={props.filters.endHour ? props.filters.endHour : '23:59'}
                                    onChange={(e) => props.handleChangeEndHour(e.target.value)} fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
                                <TextField
                                    select
                                    variant="outlined"
                                    className={classes.relationSelect}
                                    value={props.filters.maxPeopleSign}
                                    onChange={e => props.handleChangeMaxPeopleSign(e.target.value as MathRelation)}>

                                    <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                                    <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                                    <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                                </TextField>

                                <TextField
                                    value={props.filters.maxPeople}
                                    variant="outlined"
                                    error={props.errorMaxPeople !== ''}
                                    label={`${t("eventList.maxPeople")} ${props.errorMaxPeople ? " - " + props.errorMaxPeople : ""}`}
                                    type='number'
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        }
                                    }}
                                    onKeyPress={(e) => props.restrictNumberInput(e)}
                                    onChange={(e) => props.handleChangeMaxPeople(e.target.value)}
                                    fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
                                <TextField
                                    select
                                    variant="outlined"
                                    className={classes.relationSelect}
                                    value={props.filters.rateSign}
                                    onChange={e => props.handleChangeRateSign(e.target.value as MathRelation)} >

                                    <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                                    <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                                    <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                                </TextField>

                                <TextField
                                    value={props.filters.rate}
                                    label={`${t("eventList.occupancyRate")} ${props.errorRate ? " - " + props.errorRate : ""}`}
                                    variant="outlined"
                                    type='number'
                                    error={props.errorRate !== ''}
                                    InputProps={{
                                        inputProps: {
                                            max: 100, min: 0,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyPress={(e) => props.restrictNumberInput(e)}
                                    onChange={(e) => props.handleChangeRate(e.target.value)}
                                    fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={2}>
                                <TextField
                                    select
                                    variant="outlined"
                                    label={t("eventList.status")}
                                    value={props.filters.status}
                                    onChange={(e) => props.handleChangeStatus(e.target.value as string)}
                                    fullWidth>

                                    <MenuItem value={'true'}>{t("eventList.active")}</MenuItem>
                                    <MenuItem value={'false'}>{t("eventList.inactive")}</MenuItem>
                                    <MenuItem value={'none'}>{t("eventList.notSet")}</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={12} md={2} className={classes.highlightedCheckbox}>
                                <FormControlLabel
                                    control=
                                    {
                                        <YellowCheckbox
                                            checked={props.filters.highlighted}
                                            onChange={(e) => props.handleChangeHighlighted(e.target.checked)} />
                                    }
                                    label={t("eventList.highlighted")}
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>

                <Grid item xs={12} sm={3} md={2} className={classes.filterButtonsArea}>
                    <Button
                        className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}  ${classes.filterButtons}`}
                        onClick={props.resetFilters}>
                        {t("eventList.clearButton")}
                    </Button>

                    <Button
                        type='submit'
                        disabled={props.errorRate !== "" || props.errorMaxPeople !== "" || props.errorStartDate !== ""
                            || props.errorEndDate !== "" || props.errorStartHour !== "" || props.errorEndHour !== ""}
                        className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${classes.filterButtons}`}>
                        {t("eventList.filterButton")}
                    </Button>

                    <div onClick={props.toggle} className={classes.filterExpandText}>
                        {
                            props.isExpanded ? t("eventList.seeLessFilters") : t("eventList.seeMoreFilters")
                        }
                    </div>
                </Grid>
            </Grid>
        </form >
    )
}

export default FilterSectionDumb;
