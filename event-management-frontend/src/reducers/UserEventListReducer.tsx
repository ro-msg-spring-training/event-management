import { UserEventList } from '../model/UserEventList'
import { FETCH_USER_EVENTS_SUCCESS, FETCH_USER_EVENTS_REQUEST, FETCH_USER_EVENTS_ERROR, UPDATE_IS_FETCHING } from '../actions/UserEventListActions'

export interface UserEventsPageState {
    events: UserEventList[],
    isError: boolean,
    isFetching: boolean,
    page: number,
    limit: number,
    isMore: boolean
}

const initialState = {
    events: [],
    isError: false,
    isFetching: false,
    page: 1,
    limit: 6,
    isMore: false
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
                isFatching: true,
            }
        case FETCH_USER_EVENTS_SUCCESS:
            console.log('reducer suceess', action.payload)
            return {
                ...state,
                events: state.events.concat(action.payload.events),
                isMore: action.payload.more,
                isFetching: false,
                page: state.page + 1
            }
        case FETCH_USER_EVENTS_ERROR:
            return {
                ...state,
                isError: true,
                isMore: false,
                isFetching: false
            }
        case UPDATE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
        }
        default:
            return state
    }
}
