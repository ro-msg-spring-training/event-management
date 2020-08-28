import { UserEventList } from "../model/userEventsPage/UserEventList";
import { UserEventFilters } from "../model/userEventsPage/UserEventFilters";
import { LocationType } from "../types/LocationType";
import { UserEventIsFilterType } from "../model/userEventsPage/UserEventIsFilterType";

export const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";
export const FETCH_USER_EVENTS_REQUEST = "FETCH_USER_EVENTS_REQUEST";
export const FETCH_USER_EVENTS_SUCCESS = "FETCH_USER_EVENTS_SUCCESS";
export const FETCH_USER_EVENTS_ERROR = "FETCH_USER_EVENTS_ERROR";

export const FETCH_USER_EVENTS_LOCATIONS = "FETCH_USER_EVENTS_LOCATIONS";
export const FETCH_USER_EVENTS_LOCATIONS_REQUEST = "FETCH_USER_EVENTS_LOCATIONS_REQUEST";
export const FETCH_USER_EVENTS_LOCATIONS_SUCCESS = "FETCH_USER_EVENTS_LOCATIONS_SUCCESS";
export const FETCH_USER_EVENTS_LOCATIONS_ERROR = "FETCH_USER_EVENTS_LOCATIONS_ERROR";

export const UPDATE_IS_FETCHING = "UPDATE_IS_FETCHING"
export const UPDATE_USER_FILTERS = "UPDATE_USER_FILTERS"
export const RESET_USER_FILTERS = "RESET_USER_FILTERS"
export const SET_FILTER_USER_EVENTS_MODE = "SET_FILTER_USER_EVENTS_MODE"

export const fetchUserEvents = (page: number, limit: number, isFilter: UserEventIsFilterType, filters: UserEventFilters) => {
    return {
        type: FETCH_USER_EVENTS,
        payload: { page: page, limit: limit, isFilter: isFilter, filters: filters }
    }
}

export const fetchUserEventsRequest = () => {
    return {
        type: FETCH_USER_EVENTS_REQUEST
    }
}

export const fetchUserEventsSuccess = (events: UserEventList[]) => {
    return {
        type: FETCH_USER_EVENTS_SUCCESS,
        payload: events
    }
}

export const fetchUserEventsError = () => {
    return {
        type: FETCH_USER_EVENTS_ERROR
    }
}

export const fetchUserEventsLocations = () => {
    return {
        type: FETCH_USER_EVENTS_LOCATIONS
    }
}

export const fetchUserEventsLocationsRequest = () => {
    return {
        type: FETCH_USER_EVENTS_LOCATIONS_REQUEST
    }
}

export const fetchUserEventsLocationsSuccess = (locations: LocationType[]) => {
    return {
        type: FETCH_USER_EVENTS_LOCATIONS_SUCCESS,
        payload: locations.map(loc => loc.name)
    }
}

export const fetchUserEventsLocationsError = () => {
    return {
        type: FETCH_USER_EVENTS_LOCATIONS_ERROR
    }
}

export const setIsFetching = (isFetching: boolean) => {
    return {
        type: UPDATE_IS_FETCHING,
        payload: isFetching
    }
}

export const updateUserFilters = (filters: UserEventFilters) => {
    return {
        type: UPDATE_USER_FILTERS,
        payload: filters
    }
}

export const resetUserFilters = () => {
    return {
        type: RESET_USER_FILTERS,
    }
}

export const setUserFilterMode = () => {
    return {
        type: SET_FILTER_USER_EVENTS_MODE,
    }
}
