import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { MathRelation } from '../../../model/MathRelation';
import { formatDate } from '../../../utils/formatDate';
import { useStyles } from '../../../styles/filterStyles';

interface Props {
    isExpanded: boolean,
    filters: any,
    updateFilters: (filters: any) => void,
    toggle: () => void,
    submitForm: (event: any) => void,
    handleChangeTitle: (title: string) => void,
    handleChangeSubtitle: (subtitle: string) => void,
    handleChangeLocation: (location: string) => void,
    handleChangeStatus: (status: string) => void,
    handleChangeHighlighted: (highlighted: boolean) => void,
    handleChangeStartHour: (startHour: string) => void,
    handleChangeEndHour: (endHour: string) => void,
    handleChangeDate: (date: any) => void,
    handleChangeMaxPeople: (maxPeople: string) => void,
    handleChangeMaxPeopleSign: (maxPeopleSign: MathRelation) => void,
    handleChangeRate: (rate: string) => void,
    handleChangeRateSign: (rateSign: MathRelation) => void,
}


function FilterSectionDumb(props: Props) {
    const classes = useStyles()
    
    const diplayDate = () => {
        let result = ''

        if (props.filters.startDate !== null) {
            result += formatDate(props.filters.startDate, '/')
        }

        if (props.filters.endDate !== null) {
            result += " to " + formatDate(props.filters.endDate, '/')
        }

        return result
    }

    const titleInput = () => {
        return (
            <TextField
                label="Title"
                onChange={(e) => props.handleChangeTitle(e.target.value)}
                fullWidth />
        )
    }

    const locationInput = () => {
        return (
            <TextField
                label="Location"
                
                onChange={(e) => props.handleChangeLocation(e.target.value)}
                fullWidth />
        )
    }

    const dateInput = () => {
        return (
            <DatePicker
                selected={props.filters.startDate}
                startDate={props.filters.startDate}
                endDate={props.filters.endDate}
                selectsRange
                value={diplayDate()}
                onChange={(e) => props.handleChangeDate(e)}
                customInput={<TextField label="Date" />} />
        )
    }

    const showSomeFilters = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    {
                        titleInput()
                    }
                </Grid>

                <Grid item xs={12} sm={4}>
                    {
                        locationInput()
                    }
                </Grid>
                <Grid item xs={12} sm={4}>
                    {
                        dateInput()
                    }
                </Grid>
            </Grid>
        )
    }

    const showAllFilters = () => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    {
                        titleInput()
                    }
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Subtitle"
                        onChange={(e) => props.handleChangeSubtitle(e.target.value)}
                        fullWidth />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        label="Status"
                        value={props.filters.status}
                        onChange={(e) => props.handleChangeStatus(e.target.value as string)}
                        fullWidth>

                        <MenuItem value={'true'}>Active</MenuItem>
                        <MenuItem value={'false'}>Inactive</MenuItem>
                        <MenuItem value={'none'}>Not set</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    {
                        locationInput()
                    }
                </Grid>

                <Grid item xs={12} sm={4}>
                    {
                        dateInput()
                    }
                </Grid>

                <Grid item xs={12} sm={4} className={classes.timeArea}>
                    <TextField
                        className={classes.timeInput}
                        label="Start hour"
                        type="time"
                        defaultValue={props.filters.startHour}
                        onChange={(e) => props.handleChangeStartHour(e.target.value)} />

                    <div>
                        to
                    </div>

                    <TextField
                        className={classes.timeInput}
                        label="End hour"
                        type="time"
                        defaultValue={props.filters.endHour}
                        onChange={(e) => props.handleChangeEndHour(e.target.value)} />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.relationArea}>
                    <Select
                        className={classes.relationSelect}
                        value={props.filters.maxPeopleSign}
                        onChange={e => props.handleChangeMaxPeopleSign(e.target.value as MathRelation)}>

                        <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                        <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                        <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                    </Select>

                    <TextField
                        fullWidth
                        label='Max people'
                        type='number'
                        InputProps={{
                            inputProps: { 
                                min: 0 
                            }
                        }}
                        onChange={(e) => props.handleChangeMaxPeople(e.target.value)} />

                </Grid>

                <Grid item xs={12} sm={4} className={classes.relationArea}>
                    <Select
                        className={classes.relationSelect}
                        value={props.filters.rateSign}
                        onChange={e => props.handleChangeRateSign(e.target.value as MathRelation)} >

                        <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                        <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                        <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                    </Select>

                    <TextField
                        fullWidth
                        label='Occupacy rate'
                        type='number'
                        InputProps={{
                            inputProps: { 
                                max: 100, min: 0 
                            }
                        }}
                        onChange={(e) => props.handleChangeRate(e.target.value)} />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.highlightedCheckbox}>
                    <FormControlLabel
                        control=
                        {
                            <Checkbox onChange={(e) => props.handleChangeHighlighted(e.target.checked)} />
                        }
                        label="Highlighted"
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <form onSubmit={event => props.submitForm(event)}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    {
                        props.isExpanded ? showAllFilters() : showSomeFilters()
                    }
                </Grid>

                <Grid item xs={2} className={classes.filterButtonsArea}>
                    <Button type='submit'>Filter</Button>
                    <div onClick={props.toggle} className={classes.filterExpandText}>
                        {
                            props.isExpanded ? "See less filters" : "See more filters"
                        }
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

export default FilterSectionDumb;
