import { fetchFilteredEvents } from "../services/EventsService"
import { EventFiltersProps } from "../types/EventFiltersProps"

export const UPDATE_FILTERS = "UPDATE_FILTERS"
export const FILTER_EVENTS = "FILTER_EVENTS"
export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS"
export const FILTER_EVENTS_ERROR = "FILTER_EVENTS_ERROR"


export const updateFilters = (filters: EventFiltersProps) => {
    return {
        type: UPDATE_FILTERS,
        payload: filters,
    }
}

export const filterEvents = (filters: EventFiltersProps) => {
    return {
        type: FILTER_EVENTS,
        payload: filters
    }
}

export const filterEventsSuccess = (result: any) => {
    return {
        type: FILTER_EVENTS_SUCCESS,
        payload: result
    }
}

export const filterEventsError = () => {
    return {
        type: FILTER_EVENTS_ERROR,
    }
}

export const filterEventsRequest = (filters: EventFiltersProps) => {
    fetchFilteredEvents(filters)
        .then(result => {
            filterEventsSuccess(result)
        })
        .catch(err => {
            filterEventsError()
        })
}