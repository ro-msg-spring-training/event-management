import {
    UPDATE_FILTERS,
    FILTER_EVENTS_SUCCESS,
    FILTER_EVENTS_ERROR,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_ERROR,
    FETCH_EVENTS_REQUEST,
    SORT_EVENTS, FILTER_EVENTS,
    PREV_PAGE, NEXT_PAGE,
    UPADTE_SORT_CRITERIA,
    FETCH_CUSTOM_EVENTS,
    FETCH_CUSTOM_EVENTS_REQUEST,
    FETCH_CUSTOM_EVENTS_SUCCESS,
    FETCH_CUSTOM_EVENTS_ERROR,
    INCREMENT_PAGE,
    DECREMENT_PAGE,
    RESET_PAGE
} from "../actions/EventsPageActions"
import { MathRelation } from "../model/MathRelation"
import { EventFilters } from "../model/EventFilters";
import { fetchSortedEvents, changePage } from "../api/EventsServiceAPI";
import { EventSort } from "../model/EventSort";


export interface EventsPageState {
    filters: EventFilters,
    allEvents: [],
    isLoading: boolean,
    isError: boolean,
    eventsSort: EventSort,
    page: number
}

const initialState: EventsPageState = {
    filters: {
        title: '',
        subtitle: '',
        status: 'none',
        highlighted: true,
        location: '',
        startDate: null,
        endDate: null,
        startHour: '00:00',
        endHour: '23:59',
        rate: '',
        rateSign: MathRelation.GREATER,
        maxPeople: '',
        maxPeopleSign: MathRelation.GREATER
    },
    isLoading: true,
    isError: false,
    allEvents: [],
    eventsSort: { criteria: '', type: '' },
    page: 1
}

interface ReducerActionProps {
    type: string,
    payload: any,
    sort: any,
    page: number
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case INCREMENT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case DECREMENT_PAGE:
            return {
                ...state,
                page: state.page - 1
            }
        case RESET_PAGE:
            return {
                ... state,
                page: 1
            }
        case UPADTE_SORT_CRITERIA:
            return {
                ...state,
                eventsSort: action.payload
            }
        case PREV_PAGE:
            changePage(action.payload, action.sort, state.page - 1)
            return {
                ...state,
                page: state.page - 1,
            };
        case NEXT_PAGE:
            changePage(action.payload, action.sort, state.page + 1)
            return {
                ...state,
                page: state.page + 1
            };
        case SORT_EVENTS:
            fetchSortedEvents(action.payload, state.filters, action.page)
            return {
                ...state,
                eventsSort: action.payload
            };
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case FILTER_EVENTS:
            return {
                ...state,
                eventsSort: { criteria: "", type: "" }
            };
        case FILTER_EVENTS_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
            };
        case FILTER_EVENTS_ERROR:
            return {
                ...state,
            };
        case FETCH_EVENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_EVENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case FETCH_CUSTOM_EVENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_CUSTOM_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allEvents: action.payload
            }
        case FETCH_CUSTOM_EVENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            return state
    }
}