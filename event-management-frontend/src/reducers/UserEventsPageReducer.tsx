import { UserEventList } from '../model/userEventsPage/UserEventList'
import { FETCH_USER_EVENTS_SUCCESS, FETCH_USER_EVENTS_REQUEST, FETCH_USER_EVENTS_ERROR, UPDATE_IS_FETCHING, UPDATE_USER_FILTERS, FETCH_USER_EVENTS_LOCATIONS_SUCCESS, RESET_USER_FILTERS, SET_FILTER_USER_EVENTS_MODE, FETCH_USER_EVENTS_LOCATIONS_REQUEST, FETCH_USER_EVENTS_LOCATIONS_ERROR } from '../actions/UserEventsPageActions'
import { UserEventFilters } from '../model/userEventsPage/UserEventFilters'
import { UserEventType } from '../model/userEventsPage/UserEventType'
import { UserMathRelation } from '../model/userEventsPage/UserMathRelation'
import { UserEventIsFilterType } from '../model/userEventsPage/UserEventIsFilterType'

export interface UserEventsPageState {
    events: UserEventList[],
    isError: boolean,
    isFetching: boolean,
    page: number,
    limit: number,
    isMore: boolean,
    filters: UserEventFilters,
    locations: string[],
    isLocationsLoading: boolean,
    isLocationsError: boolean,
    isFilter: UserEventIsFilterType
}

const initialPage = 1

const initialState = {
    events: [],
    isError: false,
    isFetching: false,
    page: initialPage,
    limit: 4,
    isMore: false,
    filters: {
        title: '',
        locations: [],
        rate: '',
        rateSign: UserMathRelation.GREATER,
        type: UserEventType.UPCOMING
    },
    locations: [],
    isLocationsLoading: false,
    isLocationsError: false,
    isFilter: UserEventIsFilterType.NOT_IN_USE
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
        case FETCH_USER_EVENTS_LOCATIONS_REQUEST:
            return {
                ...state,
                isLocationsLoading: true
            }
        case FETCH_USER_EVENTS_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.payload,
                isLocationsLoading: false,
            }
        case FETCH_USER_EVENTS_LOCATIONS_ERROR:
            return {
                ...state,
                isLocationsLoading: false,
                isLocationsError: true
            }
        case UPDATE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case UPDATE_USER_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        case RESET_USER_FILTERS:
            return {
                ...state,
                events: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.events : [],
                page: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.page : initialPage,
                isMore: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.isMore : false,
                isFilter: UserEventIsFilterType.NOT_IN_USE,
                filters: {
                    title: '',
                    locations: [],
                    rate: '',
                    rateSign: UserMathRelation.GREATER,
                    type: UserEventType.UPCOMING
                }
            }
        case SET_FILTER_USER_EVENTS_MODE:
            return {
                ...state,
                page: 1,
                isMore: false,
                events: [],
                isFilter: state.isFilter === UserEventIsFilterType.NOT_IN_USE ?
                    UserEventIsFilterType.IN_USE_STATE_1 :
                    state.isFilter === UserEventIsFilterType.IN_USE_STATE_1 ?
                        UserEventIsFilterType.IN_USE_STATE_2 :
                        UserEventIsFilterType.IN_USE_STATE_1,
            }
        default:
            return state
    }
}
