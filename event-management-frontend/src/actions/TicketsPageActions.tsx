import { Event } from "../model/Event";

export const FETCH_TICKETS = 'FETCH_TICKETS'
export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST'
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS'
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR'
export const INCREMENT_PAGE = 'INCREMENT_PAGE'
export const OPEN = 'OPEN'
export const CLOSE = 'CLOSE'


export const fetchTickets = (page: number) => {
    return {
        type: FETCH_TICKETS,
        payload: {
            page: page
        }
    }
}

export const fetchTicketsRequest = () => {
    return {
        type: FETCH_TICKETS_REQUEST,
    }
}

export const fetchTicketsSuccess = (events: Array<Event>) => {
    return {
        type: FETCH_TICKETS_SUCCESS,
        payload: events
    }
}

export const fetchTicketsError = () => {
    return {
        type: FETCH_TICKETS_ERROR,
    }
}

export const incrementPage = () => {
    return {
        type: INCREMENT_PAGE,
    }
}

export const openDetails = () => {
    return {
        type: OPEN,
    }
}

export const closeDetails = () => {
    return {
        type: CLOSE,
    }
}
