import { EventFilters } from "../model/EventFilters"
import {EventSortProps} from "../model/EventSort";

export const UPDATE_FILTERS = "UPDATE_FILTERS"
export const FILTER_EVENTS = "FILTER_EVENTS"
export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS"
export const FILTER_EVENTS_ERROR = "FILTER_EVENTS_ERROR"
export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'
export const SORT_EVENTS = 'SORT_EVENTS'
export const PREV_PAGE = 'PREV_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'

export const prevPage = (filters: EventFilters, sort: EventSortProps) => {
    return {
        type: PREV_PAGE,
        payload: filters,
        sort: sort
    }
}

export const nextPage = (filters: EventFilters, sort: EventSortProps) => {
    return {
        type: NEXT_PAGE,
        payload: filters,
        sort: sort
    }
}

export const updateFilters = (filters: EventFilters) => {
    return {
        type: UPDATE_FILTERS,
        payload: filters,
    }
}

export const filterEvents = (filters: EventFilters, page: number) => {
    return {
        type: FILTER_EVENTS,
        payload: filters,
        page: page
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

export const sortEvents = (sort: EventSortProps, page: number) => {
    return {
        type: SORT_EVENTS,
        payload: sort,
        page: page
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