import React, { useState, FormEvent, KeyboardEvent } from 'react';
import FilterSectionDumb from './FilterSectionDumb';
import { Container } from '@material-ui/core';
import { updateFilters, filterEvents, resetPage, resetFilters } from '../../../actions/EventsPageActions';
import { connect } from 'react-redux';
import { MathRelation } from '../../../model/MathRelation';
import { EventFilters } from '../../../model/EventFilters';
import { useTranslation } from "react-i18next";
import { equalDate, startTimeGreaterThenEndTime, startDateBeforeEndDate } from '../../../utils/compareDateTimes';
import { AppState } from '../../../store/store';

interface Props {
    page: number,
    expanded: boolean,
    filters: EventFilters,
    resetPage: () => void,
    resetFilters: () => void
    setExpanded: (exp: boolean) => void,
    updateFilters: (filters: EventFilters) => void,
    filterEvents: (filters: EventFilters, page: number) => void,
}

function FilterSectionSmart({ page, filters, expanded, setExpanded, updateFilters, filterEvents, resetPage, resetFilters }: Props) {
    const [errorRate, setErrorRate] = useState('')
    const [errorMaxPeople, setErrorMaxPeople] = useState('')
    const [errorStartDate, setErrorStartDate] = useState('')
    const [errorEndDate, setErrorEndDate] = useState('')
    const [errorStartHour, setErrorStartHour] = useState('')
    const [errorEndHour, setErrorEndHour] = useState('')
    const [t] = useTranslation();

    const handleChange = () => {
        const newFilters = Object.assign({}, filters)
        updateFilters(newFilters)
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

        if (filters.endDate !== undefined && filters.startDate !== undefined) {
            if (equalDate(filters.startDate, filters.endDate)) {
                if (filters.startHour !== undefined && filters.endHour !== undefined) {
                    if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
                        setErrorStartHour(t('eventList.invalidHour'))
                        return;
                    }
                }
            }
        }

        setErrorEndHour('')
        setErrorStartHour('')
        handleChange()
    }

    const handleChangeEndHour = (endHour: string) => {
        filters.endHour = endHour

        if (filters.endDate !== undefined && filters.startDate !== undefined) {
            if (equalDate(filters.startDate, filters.endDate)) {
                if (filters.startHour !== undefined && filters.endHour !== undefined) {
                    if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
                        setErrorEndHour(t('eventList.invalidHour'))
                        return;
                    }
                }
            }
        }

        setErrorStartHour('')
        setErrorEndHour('')
        handleChange()
    }

    const handleChangeStartDate = (startDate: string) => {
        filters.startDate = new Date(startDate)

        if (filters.endDate !== undefined) {
            if (equalDate(filters.startDate, filters.endDate)) {
                if (filters.startHour !== undefined && filters.endHour !== undefined) {
                    if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
                        setErrorEndHour(t('eventList.invalidHour'))
                        setErrorStartHour(t('eventList.invalidHour'))
                        return;
                    }
                }
            }
            else if (startDateBeforeEndDate(filters.startDate, filters.endDate)) {
                setErrorStartDate(t('eventList.invalidDate'))
                return;
            }
        }

        setErrorStartDate('')
        setErrorEndHour('')
        setErrorStartHour('')
        setErrorEndDate('')
        handleChange()
    }

    const handleChangeEndDate = (endDate: string) => {
        filters.endDate = new Date(endDate)

        if (filters.startDate !== undefined) {
            if (equalDate(filters.startDate, filters.endDate)) {
                if (filters.startHour !== undefined && filters.endHour !== undefined) {
                    if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
                        setErrorEndHour(t('eventList.invalidHour'))
                        setErrorStartHour(t('eventList.invalidHour'))
                        return;
                    }
                }
            }
            else if (startDateBeforeEndDate(filters.startDate, filters.endDate)) {
                setErrorEndDate(t('eventList.invalidDate'))
                return;
            }
        }

        setErrorStartDate('')
        setErrorEndHour('')
        setErrorStartHour('')
        setErrorEndDate('')
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
        resetPage();
        filterEvents(filters, page);
        setExpanded(false);
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
                handleChangeStartDate={handleChangeStartDate}
                handleChangeEndDate={handleChangeEndDate}
                toggle={toggle}
                isExpanded={expanded}
                filters={filters}
                errorStartHour={errorStartHour}
                errorEndHour={errorEndHour}
                errorRate={errorRate}
                errorMaxPeople={errorMaxPeople}
                errorEndDate={errorEndDate}
                errorStartDate={errorStartDate}
                resetFilters={resetFilters}
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
                handleChangeMaxPeople={handleChangeMaxPeople}
                handleChangeMaxPeopleSign={handleChangeMaxPeopleSign}
                handleChangeRate={handleChangeRate}
                handleChangeRateSign={handleChangeRateSign} />
        </Container>
    )
}

const mapStateToProps = ({ events }: AppState) => ({
    filters: events.filters,
    page: events.page
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateFilters: (filters: EventFilters) => dispatch(updateFilters(filters)),
        filterEvents: (filters: EventFilters, page: number) => dispatch(filterEvents(filters, page)),
        resetPage: () => dispatch(resetPage()),
        resetFilters: () => dispatch(resetFilters())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(FilterSectionSmart);


