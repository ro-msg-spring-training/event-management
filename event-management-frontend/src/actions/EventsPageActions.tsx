export const UPDATE_FILTERS = "UPDATE_FILTERS"
export const FILTER_EVENTS = "FILTER_EVENTS"
export const FILTER_EVENTS_REQUEST = "FILTER_EVENTS_REQUEST"
export const FILTER_EVENTS_SUCCESS = "FILTER_EVENTS_SUCCESS"
export const FILTER_EVENTS_ERROR = "FILTER_EVENTS_ERROR"


export const updateFilters = (filters: any) => {
    return {
        type: UPDATE_FILTERS,
        payload: filters,
    }
}

export const filterEvents = () => {
    return {
        type: FILTER_EVENTS,
    }
}

export const filterEventsRequest = () => {
    return {
        type: FILTER_EVENTS_REQUEST,
    }
}

// add a new parameter to save the filtered events
export const filterEventsSuccess = () => {
    return {
        type: FILTER_EVENTS_SUCCESS,
    }
}

export const filterEventsError = () => {
    return {
        type: FILTER_EVENTS_ERROR,
    }
}