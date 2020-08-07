import { UPDATE_FILTERS } from "../actions/EventsPageActions"
import { MathRelation } from "../model/MathRelation"


export interface EventPageFilters {
    title: string,
    subtitle: string,
    status: string,
    highlighted: boolean,
    location: string,
    startDate: any,
    endDate: any, // to change
    startHour: any, // to change
    endHour: any, // to change
    rate: number,
    rateSign: MathRelation,
    maxPeople: number,
    maxPeopleSign: MathRelation
}


export interface EventsPageState {
    isExpanded: boolean,
    filters: EventPageFilters
}

const initialState: EventsPageState = {
    isExpanded: false,
    filters: {
        title: '',
        subtitle: '',
        status: 'none',
        highlighted: true,
        location: '',
        startDate: null,
        endDate: null,
        startHour: undefined,
        endHour: undefined,
        rate: 0,
        rateSign: MathRelation.GREATER,
        maxPeople: 100,
        maxPeopleSign: MathRelation.GREATER
    },
}

interface ReducerActionProps {
    type: string,
    payload: boolean | any
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state
    }
}