import {
    FILTER_EVENTS,
    FETCH_EVENTS,
    FETCH_HOME_EVENTS,
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsError,
    fetchEventsRequestHome,
    fetchEventsSuccessHome,
    fetchEventsErrorHome,
    filterEventsSuccess,
    filterEventsError,
    SORT_EVENTS, PREV_PAGE, NEXT_PAGE, FETCH_CUSTOM_EVENTS, FETCH_CUSTOM_EVENTS_HOME,
    fetchCustomEventsRequest, fetchCustomEventsSuccess, fetchCustomEventsError,
    fetchCustomEventsRequestHome, fetchCustomEventsSuccessHome, fetchCustomEventsErrorHome
} from "../actions/EventsPageActions";

import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { EventFilters } from "../model/EventFilters";
import {
    fetchEvents,
    fetchFilteredEvents,
    fetchSortedEvents,
    fetchHomeEvents,
    fetchPaginatedHomeEvents
} from "../api/EventsServiceAPI";
import { EventSort } from "../model/EventSort";


interface FilterEventsProps {
    type: string,
    payload: EventFilters
}

interface SortEventsProps {
    type: string,
    payload: EventSort
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
function* fetchFilteredEventsAsync(action: any) {
    try {
        const result = yield call(() => fetchFilteredEvents(action.payload, action.page))
        yield put(filterEventsSuccess(result))
    }
    catch (err) {
        yield put(filterEventsError())
    }
}

export function* watchFetchFilteredEventsAsync() {
    yield takeLatest(FILTER_EVENTS, fetchFilteredEventsAsync)
}

function* sortEventsAsync() {
    yield delay(1000);
}

export function* watchSortEventsAsync() {
    yield takeEvery(SORT_EVENTS, sortEventsAsync)
}

function* prevPageAsync() {
    yield delay(1000);
}

export function* watchPrevPageAsync() {
    yield takeEvery(PREV_PAGE, prevPageAsync)
}

function* nextPageAsync() {
    yield delay(1000);
}

export function* watchNextPageAsync() {
    yield takeEvery(NEXT_PAGE, nextPageAsync)
}

function* fetchEventsAsync() {
    yield put(fetchEventsRequest())
    try {
        const result = yield fetchEvents()
        yield put(fetchEventsSuccess(result))
    }
    catch (err) {
        yield put(fetchEventsError())
    }
}

export function* watchFetchEventsAsync() {
    yield takeEvery(FETCH_EVENTS, fetchEventsAsync)
}

function* fetchHomeEventsAsync() {
    yield put(fetchEventsRequestHome())
    try {
        const result = yield fetchHomeEvents()
        yield put(fetchEventsSuccessHome(result))
    }
    catch (err) {
        yield put(fetchEventsErrorHome())
    }
}

export function* watchFetchHomeEventsAsync() {
    yield takeEvery(FETCH_HOME_EVENTS, fetchHomeEventsAsync)
}

// custom events


function* fetchCustomEventsAsync(action: any) {
    yield put(fetchCustomEventsRequest())
    try {
        const result = yield call (() => fetchSortedEvents(action.payload.sort, action.payload.filters, action.payload.page))
        yield put(fetchCustomEventsSuccess(result))
    }
    catch (err) {
        yield put(fetchCustomEventsError())
    }
}

export function* watchFetchCustomEventsAsync() {
    yield takeEvery(FETCH_CUSTOM_EVENTS, fetchCustomEventsAsync)
}

function* fetchCustomHomeEventsAsync(action: any) {
    yield put(fetchCustomEventsRequestHome())
    try {
        const result = yield call (() => fetchPaginatedHomeEvents(action.payload.page))
        yield put(fetchCustomEventsSuccessHome(result))
    }
    catch (err) {
        yield put(fetchCustomEventsErrorHome())
    }
}

export function* watchFetchCustomHomeEventsAsync() {
    yield takeEvery(FETCH_CUSTOM_EVENTS_HOME, fetchCustomHomeEventsAsync)
}