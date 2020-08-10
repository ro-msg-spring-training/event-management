import { fetchFilteredEvents, fetchEvents } from "../services/EventsService"
import { EventFiltersProps } from "../types/EventFiltersProps"

export const UPDATE_FILTERS = "UPDATE_FILTERS"
export const FILTER_EVENTS = "FILTER_EVENTS"
export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS"
export const FILTER_EVENTS_ERROR = "FILTER_EVENTS_ERROR"
export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'


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

export const fetchAllEvents = () => {
    return {
        type: FETCH_EVENTS,
    }
}

export const fetchEventsRequest = () => {
    return {
        type: FETCH_EVENTS_REQUEST,
    }
}

export const fetchEventsSuccess = (result: any) => {
    console.log('in fetchEventsSuccess')
    return {
        type: FETCH_EVENTS_SUCCESS,
        payload: result
    }
}

export const fetchEventsError = () => {
    return {
        type: FETCH_EVENTS_ERROR,
    }
}

export const filterEventsFromService = (filters: EventFiltersProps) => {
    fetchFilteredEvents(filters)
        .then(result => {
            filterEventsSuccess(result)
        })
        .catch(err => {
            filterEventsError()
        })
}

export const fetchEventsFromService = () => {
    fetchEventsRequest()
    fetchEvents()
        .then(result => {
            console.log('heeeloe')
            fetchEventsSuccess(result)
        })
        .catch(err => {
            console.log(err)
            fetchEventsError()
        })
}