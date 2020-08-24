import { UserEventList } from '../model/UserEventList'
import { FETCH_USER_EVENTS_SUCCESS, FETCH_USER_EVENTS_REQUEST, FETCH_USER_EVENTS_ERROR } from '../actions/UserEventListActions'

export interface UserEventsPageState {
    events: UserEventList[],
    isLoading: boolean,
    isError: boolean,
    page: number,
    limit: number,
    isMore: boolean
}

const initialState = {
    events: [],
    isLoading: false,
    isError: false,
    page: 1,
    limit: 10,
    isMore: true
}

interface ReducerActionProps {
    type: string,
    payload: any
}

export const UserEventsReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case FETCH_USER_EVENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_USER_EVENTS_SUCCESS:
            return {
                ...state,
                events: state.events.concat(action.payload.events),
                isMore: action.payload.more,
                isLoading: false
            }
        case FETCH_USER_EVENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isMore: false
            }
        default:
            return state
    }
}
