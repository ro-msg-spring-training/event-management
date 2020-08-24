export const FETCH_TICKETS = 'FETCH_TICKETS'
export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST'
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS'
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR'
export const UPDATE_TICKETS = 'UPDATE_TICKETS'


export const fetchAllTickets = () => {
    return {
        type: FETCH_TICKETS,
    }
}

export const updateTickets = (tickets: any) => {
    return {
        type: UPDATE_TICKETS,
        payload: tickets
    }
}

export const fetchTicketsRequest = () => {
    return {
        type: FETCH_TICKETS_REQUEST,
    }
}

export const fetchTicketsSuccess = (result: any) => {
    return {
        type: FETCH_TICKETS_SUCCESS,
        payload: result
    }
}

export const fetchTicketsError = () => {
    return {
        type: FETCH_TICKETS_ERROR,
    }
}