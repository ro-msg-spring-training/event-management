import {
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_ERROR,
    FETCH_TICKETS_REQUEST, UPDATE_TICKETS,
} from "../actions/TicketsPageActions"


export interface TicketsPageState {
    allTickets: [],
    isLoading: boolean,
    isError: boolean
}

const initialState: TicketsPageState = {
    allTickets: [],
    isLoading: true,
    isError: false
}

interface ReducerActionProps {
    type: string,
    payload: any
}

export const TicketsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {

        case FETCH_TICKETS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                allTickets: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_TICKETS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case UPDATE_TICKETS:
            return {
                ...state,
                allTickets: action.payload
            }
        default:
            return state
    }
}