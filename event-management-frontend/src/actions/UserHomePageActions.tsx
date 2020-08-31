import { Booking } from "../model/userHome/Booking";
import { EventCard } from "../model/userHome/EventCard";
import { HighlightedEvent } from "../reducers/UserHomePageReducer";
import {
  UserHomePageActionTypes,
  FetchHighlightedEventsAction,
  FetchHighlightedEventsSuccessAction,
  FetchHighlightedEventsRequestAction,
  FetchHighlightedEventsErrorAction,
} from "../types/UserHomePageActionTypes";

export const fetchBookings = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS,
  };
};

export const fetchBookingsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST,
  };
};

export const fetchBookingsSuccess = (bookings: Booking[]) => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS,
    bookings: bookings,
  };
};

export const fetchBookingsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_ERROR,
  };
};

export const fetchUserPastEvents = (page: number, limit: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS,
    page: page,
    limit: limit,
  };
};

export const fetchUserPastEventsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST,
  };
};

export const fetchUserPastEventsSuccess = (events: EventCard[], more: boolean, noPages: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS,
    events: events,
    more: more,
    noPages: noPages,
  };
};

export const fetchUserPastEventsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR,
  };
};

export const fetchUserUpcomingEvents = (page: number, limit: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS,
    page: page,
    limit: limit,
  };
};

export const fetchUserUpcomingEventsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST,
  };
};

export const fetchUserUpcomingEventsSuccess = (events: EventCard[], more: boolean, noPages: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS,
    events: events,
    more: more,
    noPages: noPages,
  };
};

export const fetchUserUpcomingEventsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR,
  };
};

export const updatePastEventsPage = (page: number) => {
  return {
    type: UserHomePageActionTypes.UPDATE_PAST_EVENTS_PAGE,
    page: page,
  };
};

export const updateUpcomingEventsPage = (page: number) => {
  return {
    type: UserHomePageActionTypes.UPDATE_UPCOMING_EVENTS_PAGE,
    page: page,
  };
};

export const fetchHighlightedEvents = (): FetchHighlightedEventsAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS,
  };
};

export const fetchHighlightedEventsRequest = (): FetchHighlightedEventsRequestAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST,
  };
};

export const fetchHighlightedEventsSuccess = (events: HighlightedEvent[]): FetchHighlightedEventsSuccessAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS,
    events: events,
  };
};

export const fetchHighlightedEventsError = (): FetchHighlightedEventsErrorAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR,
  };
};
