import { Booking } from "../model/userHome/Booking"
import { EventCard } from "../model/userHome/EventCard"
import { UserHomePageActionTypes } from "../types/UserHomePageTypes";

export const fetchBookings = () => {
    return {
        type: UserHomePageActionTypes.FETCH_BOOKINGS
    }
}

export const fetchBookingsRequest = () => {
    return {
        type: UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST
    }
}

export const fetchBookingsSuccess = (bookings: Booking[]) => {
    return {
        type: UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS,
        payload: bookings
    }
}

export const fetchBookingsError = () => {
    return {
        type: UserHomePageActionTypes.FETCH_BOOKINGS_ERROR
    }
}

export const fetchUserPastEvents = (page: number, limit: number) => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS,
        page: page,
        limit: limit
    }
}

export const fetchUserPastEventsRequest = () => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST
    }
}

export const fetchUserPastEventsSuccess = (bookings: EventCard[]) => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS,
        payload: bookings
    }
}

export const fetchUserPastEventsError = () => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR
    }
}

export const fetchUserUpcomingEvents = (page: number, limit: number) => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS,
        page: page,
        limit: limit
    }
}

export const fetchUserUpcomingEventsRequest = () => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST
    }
}

export const fetchUserUpcomingEventsSuccess = (bookings: EventCard[]) => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS,
        payload: bookings
    }
}

export const fetchUserUpcomingEventsError = () => {
    return {
        type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR
    }
}
