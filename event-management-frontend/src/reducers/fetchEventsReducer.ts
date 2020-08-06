import { FETCH_EVENTS } from "../actions/Types";
import eventsUrl from "../api/EventsUrl";

export interface FetchEventsState {
    isLoading: boolean,
    allEvents: [],
}

const initialState: FetchEventsState = {
    isLoading: true,
    allEvents: []
}

let eventsAPI: never[] = []
export const fetchEvents = () => {
    fetch(eventsUrl)
        .then(response => response.json())
        .then(events => eventsAPI = events)
}

export const FetchEventsReducer = (state = initialState, action: { type: any; }) => {
    switch (action.type) {
        case FETCH_EVENTS:
            fetchEvents();
            return {
                ...state,
                allEvents: eventsAPI
            };

        default:
            return state;
    }
}