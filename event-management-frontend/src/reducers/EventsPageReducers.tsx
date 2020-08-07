import { UPDATE_FILTERS } from "../actions/EventsPageActions"
import { MathRelation } from "../model/MathRelation"


export interface EventPageFilters {
    title: string,
    subtitle: string,
    status: string,
    highlighted: boolean,
    location: string,
    startDate: any, // to change
    endDate: any, // to change
    startHour: string, 
    endHour: string, 
    rate: number | string,
    rateSign: MathRelation,
    maxPeople: number | string,
    maxPeopleSign: MathRelation
}


export interface EventsPageState {
    filters: EventPageFilters
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
}

interface ReducerActionProps {
    type: string,
    payload: boolean | any
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
    switch (action.type) {
        case UPDATE_FILTERS:
            console.log('in reducer', action.payload)
            return {
                ...state,
                filters: action.payload
            }
        default:
            return state
    }
}