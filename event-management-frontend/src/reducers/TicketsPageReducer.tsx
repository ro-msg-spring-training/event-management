import {
    FETCH_TICKETS,
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_ERROR, INCREMENT_PAGE,
} from "../actions/TicketsPageActions"
import {INCREMENT_PAGE_HOME} from "../actions/EventsPageActions";


export interface TicketsPageState {
    allTickets: [],
    page: number,
    isLoading: boolean,
    isError: boolean
}

const initialState: TicketsPageState = {
    allTickets: [],
    page: 1,
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
                isLoading: true,
                isError: false
            }
        case FETCH_TICKETS:
            return {
                ...state,
            }
        case FETCH_TICKETS_SUCCESS:
            return  {
                ...state,
                isLoading: false,
                isError: false,
                allTickets: action.payload
            }
        case FETCH_TICKETS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case INCREMENT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        default:
            return state
    }
}