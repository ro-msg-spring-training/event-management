import {
    UPDATE_FILTERS,
    FILTER_EVENTS_SUCCESS,
    FILTER_EVENTS_ERROR,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_ERROR,
    FETCH_EVENTS_REQUEST,
    SORT_EVENTS, FILTER_EVENTS
} from "../actions/EventsPageActions"
import { MathRelation } from "../model/MathRelation"
import { EventFiltersProps } from "../types/EventFiltersProps";
import { EventSortProps } from "../types/EventSortProps";
import {fetchSortedEvents } from "../services/EventsService";


export interface EventsPageState {
    filters: EventFiltersProps,
    allEvents: [],
    isLoading: boolean,
    isError: boolean,
    eventsSort: EventSortProps,
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
    eventsSort: { criteria: '', type: ''},
}

interface ReducerActionProps {
    type: string,
    payload: any
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case SORT_EVENTS:
            fetchSortedEvents(action.payload, state.filters)
            return {
                ...state,
                eventsSort: action.payload
            }
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case FILTER_EVENTS:
            return {
                ...state,
                eventsSort: { criteria: "", type: ""}
            };
        case FILTER_EVENTS_SUCCESS:
            return {
                ...state,
                //allEvents: action.payload,
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
        default:
            return state
    }
}