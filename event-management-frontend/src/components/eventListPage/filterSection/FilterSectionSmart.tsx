import React, { useState } from 'react';
import FilterSectionDumb from './FilterSectionDumb';
import { Container } from '@material-ui/core';
import { updateFilters, filterEvents } from '../../../actions/EventsPageActions';
import { connect } from 'react-redux';
import { EventPageFilters } from '../../../reducers/EventsPageReducers';
import { MathRelation } from '../../../model/MathRelation';

interface Props {
    filters: EventPageFilters,
    updateFilters: (filters: any) => void,
    filterEvents: () => void,
}

function FilterSectionSmart({ filters, updateFilters, filterEvents }: Props) {
    const [expanded, setExpanded] = useState(false)

    const handleChange = () => {
        const newFilters = Object.assign({}, filters)
        updateFilters(newFilters)
    }

    const handleChangeDate = (value: any) => {
        const [dateStart, dateEnd] = value;
        filters.startDate = dateStart
        filters.endDate = dateEnd
        handleChange();
    }

    const handleChangeTitle = (title: string) => {
        filters.title = title
        handleChange()
    }

    const handleChangeSubtitle = (subtitle: string) => {
        filters.subtitle = subtitle
        handleChange()
    }

    const handleChangeLocation = (location: string) => {
        filters.location = location
        handleChange()
    }

    const handleChangeStatus = (status: string) => {
        filters.status = status
        handleChange()
    }

    const handleChangeHighlighted = (highlighted: boolean) => {
        filters.highlighted = highlighted
        handleChange()
    }

    const handleChangeStartHour = (startHour: string) => {
        filters.startHour = startHour
        handleChange()
    }

    const handleChangeEndHour = (endHour: string) => {
        filters.endHour = endHour
        handleChange()
    }

    const handleChangeMaxPeople = (maxPeople: string) => {
        filters.maxPeople = parseInt(maxPeople)
        handleChange()
    }

    const handleChangeMaxPeopleSign = (maxPeopleSign: MathRelation) => {
        filters.maxPeopleSign = maxPeopleSign
        handleChange()
    }

    const handleChangeRate = (rate: string) => {
        filters.rate = parseInt(rate)
        handleChange()
    }

    const handleChangeRateSign = (rateSign: MathRelation) => {
        filters.rateSign = rateSign
        handleChange()
    }

    const submitForm = (event: any) => {
        event.preventDefault()
    
        filterEvents()
    }

    const toggle = () => {
        setExpanded(!expanded)
    }

    return (
        <Container>
            <FilterSectionDumb
                toggle={toggle}
                isExpanded={expanded}
                filters={filters}
                updateFilters={updateFilters}
                submitForm={submitForm}
                handleChangeTitle={handleChangeTitle}
                handleChangeSubtitle={handleChangeSubtitle}
                handleChangeLocation={handleChangeLocation}
                handleChangeStatus={handleChangeStatus}
                handleChangeHighlighted={handleChangeHighlighted}
                handleChangeStartHour={handleChangeStartHour}
                handleChangeEndHour={handleChangeEndHour}
                handleChangeDate={handleChangeDate}
                handleChangeMaxPeople={handleChangeMaxPeople}
                handleChangeMaxPeopleSign={handleChangeMaxPeopleSign}
                handleChangeRate={handleChangeRate}
                handleChangeRateSign={handleChangeRateSign} />
        </Container>
    )
}

const mapStateToProps = (state: any) => ({
    filters: state.eventReducer.filters
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateFilters: (filters: any) => dispatch(updateFilters(filters)),
        filterEvents: () => dispatch(filterEvents())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(FilterSectionSmart);


