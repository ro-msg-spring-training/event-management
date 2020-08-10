import { UPDATE_FILTERS, FILTER_EVENTS_SUCCESS, FILTER_EVENTS_ERROR } from "../actions/EventsPageActions"
import { MathRelation } from "../model/MathRelation"
import { EventFiltersProps } from "../types/EventFiltersProps";


export interface EventsPageState {
    filters: EventFiltersProps,
    allEvents: []
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
    allEvents: []
}

interface ReducerActionProps {
    type: string,
    payload: boolean | []
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload
            };
        case FILTER_EVENTS_SUCCESS:
            return {
                ...state,
                allEvents: action.payload
            }
        case FILTER_EVENTS_ERROR:
            return {
                ...state,
            }
        default:
            return state
    }
}