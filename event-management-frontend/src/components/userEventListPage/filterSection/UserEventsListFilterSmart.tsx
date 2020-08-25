import React, { useEffect } from 'react'
import UserEventsListFilterDumb from './UserEventsListFilterDumb'
import { AppState } from '../../../store/store';
import { connect } from 'react-redux';
import { UserEventFilters } from '../../../model/UserEventFilters';
import { updateUserFilters, fetchUserEventsLocations, resetUserFilters, setUserFilterMode } from '../../../actions/UserEventListActions'
import { UserEventType } from '../../../model/UserEventType';

interface UserEventFilterProps {
    filters: UserEventFilters,
    locations: string[],
    updateUserFilters: (filters: UserEventFilters) => void,
    fetchUserEventsLocations: () => void,
    resetUserFilters: () => void,
    setUserFilterMode: () => void
}

function UserEventsListFilterSmart({ filters, locations, updateUserFilters, fetchUserEventsLocations, resetUserFilters, setUserFilterMode }: UserEventFilterProps) {

    useEffect(() => {
        fetchUserEventsLocations();
    }, []);

    const onChangeInput = (event: any) => {
        const { name, value, checked } = event.target;
        const newFilters = Object.assign({}, filters);

        switch (name) {
            case 'title':
                newFilters.title = value;
                break;
            case 'rateSign':
                newFilters.rateSign = value;
                break;
            case 'rate':
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

    const onChangeLocation = (event: any, value: string | string[], reason: string) => {
        const newFilters = Object.assign({}, filters);
        newFilters.locations = value as string[];
        updateUserFilters(newFilters);
    }

    const submitForm = (event: any) => {
        event.preventDefault();
        setUserFilterMode();
    }

    const resetFilters = () => {
        resetUserFilters();
    }

    return (
        <UserEventsListFilterDumb
            filters={filters}
            locations={locations}
            submitForm={submitForm}
            onChangeInput={onChangeInput}
            resetUserFilters={resetFilters}
            onChangeLocation={onChangeLocation}
        />
    )
}

const mapStateToProps = (state: AppState) => ({
    filters: state.userEvents.filters,
    locations: state.userEvents.locations
});

const mapDispatchToProps = (dispatch: any) => ({
    updateUserFilters: (filters: UserEventFilters) => dispatch(updateUserFilters(filters)),
    fetchUserEventsLocations: () => dispatch(fetchUserEventsLocations()),
    resetUserFilters: () => dispatch(resetUserFilters()),
    setUserFilterMode: () => dispatch(setUserFilterMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEventsListFilterSmart);
