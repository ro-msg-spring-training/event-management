import {
    FILTER_EVENTS,
    FETCH_EVENTS,
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsError,
    filterEventsSuccess,
    filterEventsError,
    SORT_EVENTS, PREV_PAGE, NEXT_PAGE
} from "../actions/EventsPageActions";

import { takeLatest, takeEvery, put } from "redux-saga/effects";
import { EventFilters } from "../model/EventFilters";
import { fetchEvents, fetchFilteredEvents } from "../services/EventsService";
import { EventSortProps } from "../types/EventSortProps";


interface FilterEventsProps {
    type: string,
    payload: EventFilters
}

interface SortEventsProps {
    type: string,
    payload: EventSortProps
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
function* fetchFilteredEventsAsync(action: any) {
    try {
        const result = yield fetchFilteredEvents(action.payload, action.page)
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

