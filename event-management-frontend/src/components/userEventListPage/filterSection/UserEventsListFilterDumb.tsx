import React from 'react'
import { UserEventFilters } from '../../../model/UserEventFilters'
import { MenuItem, TextField, Grid, InputAdornment, FormControlLabel, Button, Chip } from '@material-ui/core'
import { UserMathRelation } from '../../../model/UserMathRelation';
import { YellowCheckbox } from '../../YellowCheckbox';
import { UserEventType } from '../../../model/UserEventType';
import { useFilterStyles } from '../../../styles/FilterStyles';
import { useStyles } from '../../../styles/CommonStyles';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

interface UserEventFilterProps {
    filters: UserEventFilters,
    locations: string[],
    onChangeInput: (event: any) => void,
    onChangeLocation: (event: any, value: string | string[], reason: string) => void
    submitForm: (event: any) => void,
    resetUserFilters: () => void
}

function UserEventsListFilterDumb({ filters, locations, onChangeInput, onChangeLocation, submitForm, resetUserFilters }: UserEventFilterProps) {
    const commonClasses = useStyles()
    const classes = useFilterStyles()

    return (
        <form onSubmit={event => submitForm(event)} className={classes.filterArea}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9} md={10} xl={10} container spacing={3}>
                    <Grid item xs={12} sm={12} md={5} xl={4} >
                        <TextField
                            name='title'
                            label='Name'
                            variant='outlined'
                            value={filters.title}
                            onChange={onChangeInput}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7} xl={8}>
                        <Autocomplete
                            multiple
                            fullWidth
                            options={locations}
                            disableCloseOnSelect
                            filterSelectedOptions
                            renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            onChange={onChangeLocation}
                            renderOption={(option, { selected }) => (
                                <React.Fragment>
                                    <YellowCheckbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={selected}
                                    />
                                    {option}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Locations" />
                            )}

                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} xl={3} className={classes.relationArea} style={{ alignItems: 'flex-start' }}>
                        <TextField
                            name='rateSign'
                            className={classes.relationSelect}
                            select
                            variant='outlined'
                            value={filters.rateSign}
                            onChange={onChangeInput} >
                            <MenuItem value={UserMathRelation.GREATER}>&gt;</MenuItem>
                            <MenuItem value={UserMathRelation.GREATEROREQUAL}>&ge;</MenuItem>
                            <MenuItem value={UserMathRelation.LOWER}>&lt;</MenuItem>
                            <MenuItem value={UserMathRelation.LOWEROREQUAL}>&le;</MenuItem>
                            <MenuItem value={UserMathRelation.EQUAL}>=</MenuItem>
                        </TextField>

                        <TextField
                            name='rate'
                            label='Occupancy'
                            value={filters.rate}
                            variant='outlined'
                            type='number'
                            InputProps={{
                                inputProps: {
                                    max: 100, min: 0,
                                },
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        %
                                    </InputAdornment>
                                )
                            }}
                            onChange={onChangeInput}
                            fullWidth />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} xl={3}>
                        <FormControlLabel
                            control=
                            {
                                <YellowCheckbox
                                    name='type'
                                    checked={filters.type === UserEventType.PAST}
                                    onChange={onChangeInput} />
                            }
                            label='Past events'
                            labelPlacement='end'
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3} md={2} xl={2} container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Button
                            style={{ width: '100%' }}
                            className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}
                            onClick={resetUserFilters}
                        >
                            Reset
                    </Button>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Button
                            style={{ width: '100%' }}
                            className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}
                            type='submit'
                        >
                            Filter
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default UserEventsListFilterDumb
