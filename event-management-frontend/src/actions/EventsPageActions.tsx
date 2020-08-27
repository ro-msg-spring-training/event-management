import { EventFilters } from "../model/EventFilters"
import { EventSort } from "../model/EventSort"

export const UPDATE_FILTERS = "UPDATE_FILTERS"
export const FILTER_EVENTS = "FILTER_EVENTS"
export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS"
export const FILTER_EVENTS_ERROR = "FILTER_EVENTS_ERROR"
export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'
export const FETCH_HOME_EVENTS = 'FETCH_HOME_EVENTS'
export const FETCH_HOME_EVENTS_REQUEST = 'FETCH_HOME_EVENTS_REQUEST'
export const FETCH_HOME_EVENTS_SUCCESS = 'FETCH_HOME_EVENTS_SUCCESS'
export const FETCH_HOME_EVENTS_ERROR = 'FETCH_HOME_EVENTS_ERROR'
export const SORT_EVENTS = 'SORT_EVENTS'
export const PREV_PAGE = 'PREV_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE_HOME = 'PREV_PAGE_HOME'
export const NEXT_PAGE_HOME = 'NEXT_PAGE_HOME'

export const FETCH_CUSTOM_EVENTS = 'FETCH_CUSTOM_EVENTS'
export const FETCH_CUSTOM_EVENTS_REQUEST = 'FETCH_EVENTS_CUSTOM_REQUEST'
export const FETCH_CUSTOM_EVENTS_SUCCESS = 'FETCH_EVENTS_CUSTOM_SUCCESS'
export const FETCH_CUSTOM_EVENTS_ERROR = 'FETCH_EVENTS_CUSTOM_ERROR'

export const FETCH_CUSTOM_EVENTS_HOME = 'FETCH_CUSTOM_EVENTS_HOME'
export const FETCH_CUSTOM_EVENTS_REQUEST_HOME = 'FETCH_EVENTS_CUSTOM_REQUEST_HOME'
export const FETCH_CUSTOM_EVENTS_SUCCESS_HOME = 'FETCH_EVENTS_CUSTOM_SUCCESS_HOME'
export const FETCH_CUSTOM_EVENTS_ERROR_HOME = 'FETCH_EVENTS_CUSTOM_ERROR_HOME'

export const UPDATE_SORT_CRITERIA = 'UPDATE_SORT_CRITERIA'

export const INCREMENT_PAGE = 'INCREMENT_PAGE'
export const DECREMENT_PAGE = 'DECREMENT_PAGE'
export const INCREMENT_PAGE_HOME = 'INCREMENT_PAGE_HOME'
export const DECREMENT_PAGE_HOME = 'DECREMENT_PAGE_HOME'

export const RESET_PAGE = 'RESET_PAGE'
export const RESET_PAGE_HOME = 'RESET_PAGE_HOME'
export const RESET_FILTERS = "RESET_FILTERS"


export const prevPage = (filters: EventFilters, sort: EventSort) => {
    return {
        type: PREV_PAGE,
        payload: filters,
        sort: sort
    }
}

export const nextPage = (filters: EventFilters, sort: EventSort) => {
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

export const sortEvents = (sort: EventSort, page: number) => {
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

export const fetchAllEventsHome = () => {
    return {
        type: FETCH_HOME_EVENTS,
    }
}

export const fetchEventsRequestHome = () => {
    return {
        type: FETCH_HOME_EVENTS_REQUEST,
    }
}

export const fetchEventsSuccessHome = (result: any) => {
    return {
        type: FETCH_HOME_EVENTS_SUCCESS,
        payload: result
    }
}

export const fetchEventsErrorHome = () => {
    return {
        type: FETCH_HOME_EVENTS_ERROR,
    }
}

// called by saga and component
export const fetchCustomEvents = (filters: any, sort: any, page: number) => {
    return {
        type: FETCH_CUSTOM_EVENTS,
        payload: {
            filters: filters, sort: sort, page: page
        }
    }
}

export const fetchCustomEventsRequest = () => {
    return {
        type: FETCH_CUSTOM_EVENTS_REQUEST,
    }
}

export const fetchCustomEventsSuccess = (events: any) => {
    return {
        type: FETCH_CUSTOM_EVENTS_SUCCESS,
        payload: events
    }
}

export const fetchCustomEventsError = () => {
    return {
        type: FETCH_CUSTOM_EVENTS_ERROR,
    }
}

export const fetchCustomEventsHome = (page: number) => {
    return {
        type: FETCH_CUSTOM_EVENTS_HOME,
        payload: {
            page: page
        }
    }
}

export const fetchCustomEventsRequestHome = () => {
    return {
        type: FETCH_CUSTOM_EVENTS_REQUEST_HOME,
    }
}

export const fetchCustomEventsSuccessHome = (events: any) => {
    return {
        type: FETCH_CUSTOM_EVENTS_SUCCESS_HOME,
        payload: events
    }
}

export const fetchCustomEventsErrorHome = () => {
    return {
        type: FETCH_CUSTOM_EVENTS_ERROR_HOME,
    }
}

export const updateSortCriteria = (criteria:  any) => {
    return {
        type: UPDATE_SORT_CRITERIA,
        payload: criteria
    }
}

export const incrementPage = () => {
    return {
        type: INCREMENT_PAGE,
    }
}

export const decrementPage = () => {
    return {
        type: DECREMENT_PAGE,
    }
}

export const resetPage = () => {
    return {
        type: RESET_PAGE
    }
}

export const incrementPageHome = () => {
    return {
        type: INCREMENT_PAGE_HOME,
    }
}

export const decrementPageHome = () => {
    return {
        type: DECREMENT_PAGE_HOME,
    }
}

export const resetPageHome = () => {
    return {
        type: RESET_PAGE_HOME
    }
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    }
}
