import React, { useEffect, FormEvent, KeyboardEvent, useState, ChangeEvent } from 'react'
import UserEventsListFilterDumb from './UserEventsListFilterDumb'
import { Dispatch } from "redux";
import { AppState } from '../../../store/store';
import { connect } from 'react-redux';
import { UserEventFilters } from '../../../model/UserEventFilters';
import { updateUserFilters, fetchUserEventsLocations, resetUserFilters, setUserFilterMode } from '../../../actions/UserEventListActions'
import { UserEventType } from '../../../model/UserEventType';
import { useTranslation } from 'react-i18next';
import { UserMathRelation } from '../../../model/UserMathRelation';

interface UserEventFilterProps {
    filters: UserEventFilters,
    locations: string[],
    updateUserFilters: (filters: UserEventFilters) => void,
    fetchUserEventsLocations: () => void,
    resetUserFilters: () => void,
    setUserFilterMode: () => void
}

function UserEventsListFilterSmart({ filters, locations, updateUserFilters, fetchUserEventsLocations, resetUserFilters, setUserFilterMode }: UserEventFilterProps) {
    const [errorRate, setErrorRate] = useState('')
    const [translation] = useTranslation();

    useEffect(() => {
        fetchUserEventsLocations();
    }, [fetchUserEventsLocations]);

    const validateOccRate = (rate: string) => {
        if (rate === '') {
            setErrorRate('');
        }
        else {
            const rateNumber = parseInt(rate)

            if (rateNumber.toString() !== rate && rate !== '') {
                setErrorRate(translation("userEventList.notANumber"));
            }
            else if (rateNumber > 100) {
                setErrorRate(translation("userEventList.notAValidPercent"));
            }
            else {
                setErrorRate('');
            }
        }
    }

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;
        const newFilters = Object.assign({}, filters);

        switch (name) {
            case 'title':
                newFilters.title = value;
                break;
            case 'rateSign':
                newFilters.rateSign = UserMathRelation[value as keyof typeof UserMathRelation];
                break;
            case 'rate':
                validateOccRate(value)
                console.log('value', value, parseInt(value))
                newFilters.rate = parseInt(value);
                break;
            case 'type':
                newFilters.type = checked ? UserEventType.PAST : UserEventType.UPCOMING;
                break;
            default:
                break;
        }

        updateUserFilters(newFilters);
    }

    const onChangeLocation = (event: object, value: string | string[], reason: string) => {
        const newFilters = Object.assign({}, filters);
        newFilters.locations = value as string[];
        updateUserFilters(newFilters);
    }

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUserFilterMode();
    }

    const restrictNumberInput = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === '-' || event.key === 'e' || event.key === '+' || event.key === '.' || event.key === ',') {
            event.preventDefault();
        }
    }

    const resetFilters = () => {
        setErrorRate('');
        resetUserFilters();
        console.log(filters)

    }

    return (
        <UserEventsListFilterDumb
            filters={filters}
            locations={locations}
            errorRate={errorRate}
            translation={translation}
            submitForm={submitForm}
            onChangeInput={onChangeInput}
            resetUserFilters={resetFilters}
            onChangeLocation={onChangeLocation}
            restrictNumberInput={restrictNumberInput}
        />
    )
}

const mapStateToProps = (state: AppState) => ({
    filters: state.userEvents.filters,
    locations: state.userEvents.locations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateUserFilters: (filters: UserEventFilters) => dispatch(updateUserFilters(filters)),
    fetchUserEventsLocations: () => dispatch(fetchUserEventsLocations()),
    resetUserFilters: () => dispatch(resetUserFilters()),
    setUserFilterMode: () => dispatch(setUserFilterMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEventsListFilterSmart);
