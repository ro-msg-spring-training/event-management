import { UserEventList } from "../model/UserEventList";

export const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";
export const FETCH_USER_EVENTS_REQUEST = "FETCH_USER_EVENTS_REQUEST";
export const FETCH_USER_EVENTS_SUCCESS = "FETCH_USER_EVENTS_SUCCESS";
export const FETCH_USER_EVENTS_ERROR = "FETCH_USER_EVENTS_ERROR";
export const UPDATE_IS_FETCHING = "UPDATE_IS_FETCHING"

export const fetchUserEvents = (page: number, limit: number) => {
    return {
        type: FETCH_USER_EVENTS,
        payload: { page: page, limit: limit }
    }
}

export const fetchUserEventsRequest = () => {
    return {
        type: FETCH_USER_EVENTS_REQUEST
    }
}

export const fetchUserEventsSuccess = (events: UserEventList[]) => {
    return {
        type: FETCH_USER_EVENTS_SUCCESS,
        payload: events
    }
}

export const fetchUserEventsError = () => {
    return {
        type: FETCH_USER_EVENTS_ERROR
    }
}

export const setIsFetching = (isFetching: boolean) => {
    return {
        type: UPDATE_IS_FETCHING,
        payload: isFetching
    }
}


