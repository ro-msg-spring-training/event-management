import React, { useState, FormEvent, KeyboardEvent } from 'react';
import FilterSectionDumb from './FilterSectionDumb';
import { Container } from '@material-ui/core';
import { updateFilters, filterEvents } from '../../../actions/EventsPageActions';
import { connect } from 'react-redux';
import { MathRelation } from '../../../model/MathRelation';
import { EventFilters } from '../../../model/EventFilters';
import { useTranslation } from "react-i18next";

interface Props {
    filters: EventFilters,
    page: number,
    expanded: boolean,
    setExpanded: (exp: boolean) => void,
    updateFilters: (filters: EventFilters) => void,
    filterEvents: (filters: EventFilters, page: number) => void,
}

function FilterSectionSmart({ filters, expanded, setExpanded, updateFilters, filterEvents, page }: Props) {
    const fakeDateForComparation = '01/01/2020'

    const [errorRate, setErrorRate] = useState('')
    const [errorMaxPeople, setErrorMaxPeople] = useState('')
    const [ t ] = useTranslation();

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
        if (Date.parse(`${fakeDateForComparation} ${startHour}`)
            > Date.parse(`${fakeDateForComparation} ${filters.endHour}`)) {
                filters.startHour = filters.endHour
                filters.endHour = startHour
        }
        else {
            filters.startHour = startHour
        }
        handleChange()
    }

    const handleChangeEndHour = (endHour: string) => {
        if (Date.parse(`${fakeDateForComparation} ${endHour}`)
            < Date.parse(`${fakeDateForComparation} ${filters.startHour}`)) {
                filters.endHour = filters.startHour
                filters.startHour = endHour
        }
        else {
            filters.endHour = endHour
        }
        handleChange()
    }

    const handleChangeMaxPeople = (maxPeople: string) => {
        if (maxPeople === '') {
            setErrorMaxPeople('')
            filters.maxPeople = maxPeople
            handleChange()
        }
        else {
            const maxPeopleNumber = parseInt(maxPeople)

            if (maxPeopleNumber.toString() !== maxPeople && maxPeople !== '') {
                setErrorMaxPeople(t("eventList.notANumber"))
            }
            else {
                setErrorMaxPeople('')
                filters.maxPeople = maxPeopleNumber
                handleChange()
            }
        }
    }

    const handleChangeMaxPeopleSign = (maxPeopleSign: MathRelation) => {
        filters.maxPeopleSign = maxPeopleSign
        handleChange()
    }

    const handleChangeRate = (rate: string) => {
        if (rate === '') {
            setErrorRate('')
            filters.rate = rate
            handleChange()
        }
        else {
            const rateNumber = parseInt(rate)

            if (rateNumber.toString() !== rate && rate !== '') {
                setErrorRate(t("eventList.notANumber"))
            }
            else if (rateNumber > 100) {
                setErrorRate(t("eventList.notAValidPercent"))
            }
            else {
                setErrorRate('')
                filters.rate = rateNumber
                handleChange()
            }
        }
    }

    const handleChangeRateSign = (rateSign: MathRelation) => {
        filters.rateSign = rateSign
        handleChange()
    }

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        filterEvents(filters, page)
        setExpanded(false)
    }

    const toggle = () => {
        setExpanded(!expanded)
    }

    const restrictNumberInput = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ',') {
            e.preventDefault()
        }
    }

    return (
        <Container>
            <FilterSectionDumb
                toggle={toggle}
                isExpanded={expanded}
                filters={filters}
                errorRate={errorRate}
                errorMaxPeople={errorMaxPeople}
                restrictNumberInput={restrictNumberInput}
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

const mapStateToProps = ({events}: any) => ({
    filters: events.filters,
    page: events.page
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateFilters: (filters: EventFilters) => dispatch(updateFilters(filters)),
        filterEvents: (filters: EventFilters, page: number) => dispatch(filterEvents(filters, page))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(FilterSectionSmart);


