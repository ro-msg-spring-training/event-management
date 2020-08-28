import { UserHomePageActionTypes, FetchUserPastEventsAction, FetchUserUpcomingEventsAction } from "../types/UserHomePageTypes";
import { takeEvery, put, call } from "redux-saga/effects";
import { fetchBookingsRequest, fetchBookingsSuccess, fetchBookingsError, fetchUserPastEventsRequest, fetchUserPastEventsSuccess, fetchUserPastEventsError, fetchUserUpcomingEventsRequest, fetchUserUpcomingEventsError, fetchUserUpcomingEventsSuccess } from "../actions/UserHomePageActions";
import { fetchBookings, fetchPastEvents, fetchUpcomingEvents } from "../api/UserHomePageAPI";

function* fetchBookingsAsync() {
    yield put(fetchBookingsRequest())
    try {
        const result = yield call(() => fetchBookings());
        yield put(fetchBookingsSuccess(result));
    }
    catch (err) {
        yield put(fetchBookingsError());
    }
}

export function* watchFetchBookingsAsync() {
    yield takeEvery(UserHomePageActionTypes.FETCH_BOOKINGS, fetchBookingsAsync);
}

function* fetchUserPastEventsAsync(action: FetchUserPastEventsAction) {
    yield put(fetchUserPastEventsRequest())
    try {
        const result = yield call(() => fetchPastEvents(action.page, action.limit));
        yield put(fetchUserPastEventsSuccess(result.events, result.more, result.noPages));
    }
    catch (err) {
        yield put(fetchUserPastEventsError());
    }
}

export function* watchFetchUserPastEventsAsync() {
    yield takeEvery(UserHomePageActionTypes.FETCH_USER_PAST_EVENTS, fetchUserPastEventsAsync);
}

function* fetchUserUpcomingEventsAsync(action: FetchUserUpcomingEventsAction) {
    yield put(fetchUserUpcomingEventsRequest())
    try {
        const result = yield call(() => fetchUpcomingEvents(action.page, action.limit));
        yield put(fetchUserUpcomingEventsSuccess(result.events, result.more, result.noPages));
    }
    catch (err) {
        yield put(fetchUserUpcomingEventsError());
    }
}

export function* watchFetchUserUpcomingEventsAsync() {
    yield takeEvery(UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS, fetchUserUpcomingEventsAsync);
}