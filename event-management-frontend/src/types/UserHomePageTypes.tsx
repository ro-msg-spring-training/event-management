import { EventCard } from "../model/userHome/EventCard";
import { Booking } from "../model/userHome/Booking";

export enum UserHomePageActionTypes {
    FETCH_BOOKINGS = 'FETCH_BOOKINGS',
    FETCH_BOOKINGS_REQUEST = 'FETCH_BOOKINGS_REQUEST',
    FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS',
    FETCH_BOOKINGS_ERROR = 'FETCH_BOOKINGS_ERROR',

    FETCH_USER_PAST_EVENTS = 'FETCH_USER_PAST_EVENTS',
    FETCH_USER_PAST_EVENTS_REQUEST = 'FETCH_USER_PAST_EVENTS_REQUEST',
    FETCH_USER_PAST_EVENTS_SUCCESS = 'FETCH_USER_PAST_EVENTS_SUCCESS',
    FETCH_USER_PAST_EVENTS_ERROR = 'FETCH_USER_PAST_EVENTS_ERROR',

    FETCH_USER_UPCOMING_EVENTS = 'FETCH_USER_UPCOMING_EVENTS',
    FETCH_USER_UPCOMING_EVENTS_REQUEST = 'FETCH_USER_UPCOMING_EVENTS_REQUEST',
    FETCH_USER_UPCOMING_EVENTS_SUCCESS = 'FETCH_USER_UPCOMING_EVENTS_SUCCESS',
    FETCH_USER_UPCOMING_EVENTS_ERROR = 'FETCH_USER_UPCOMING_EVENTS_ERROR'
}

export class FetchBookingsAction {
    public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS;
}

export class FetchBookingsRequestAction {
    public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST;
}

export class FetchBookingsSuccessAction {
    public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS;
    public bookings: Booking[];

    constructor(bookings: Booking[]) {
        this.bookings = bookings
    }
}

export class FetchBookingsErrorAction {
    public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_ERROR;
}

export class FetchUserPastEventsAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS;
    public page: number;
    public limit: number;

    constructor(page: number, limit: number) {
        this.page = page
        this.limit = limit
    }
}


export class FetchUserPastEventsRequestAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST;
}

export class FetchUserPastEventsSuccessAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS;
    public events: EventCard[];

    constructor(events: EventCard[]) {
        this.events = events
    }
}

export class FetchUserPastEventsErrorAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR;
}

export class FetchUserUpcomingEventsAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS;
    public page: number;
    public limit: number;

    constructor(page: number, limit: number) {
        this.page = page
        this.limit = limit
    }
}

export class FetchUserUpcomingEventsRequestAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST;
}

export class FetchUserUpcomingEventsSuccessAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS;
    public events: EventCard[];

    constructor(events: EventCard[]) {
        this.events = events
    }
}

export class FetchUserUpcomingEventsErrorAction {
    public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR;
}

export type UserHomePageActions =
    FetchBookingsAction |
    FetchBookingsRequestAction |
    FetchBookingsSuccessAction |
    FetchBookingsErrorAction |
    FetchUserPastEventsAction |
    FetchUserPastEventsRequestAction |
    FetchUserPastEventsSuccessAction |
    FetchUserPastEventsErrorAction |
    FetchUserUpcomingEventsAction |
    FetchUserUpcomingEventsRequestAction |
    FetchUserUpcomingEventsSuccessAction |
    FetchUserUpcomingEventsErrorAction
