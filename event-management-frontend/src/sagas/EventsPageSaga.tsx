import { FILTER_EVENTS, FETCH_EVENTS, fetchEventsRequest, fetchEventsSuccess, fetchEventsError, filterEventsSuccess, filterEventsError } from "../actions/EventsPageActions";

import { takeLatest, takeEvery, put } from "redux-saga/effects";
import { EventFiltersProps } from "../types/EventFiltersProps";
import { fetchEvents, fetchFilteredEvents } from "../services/EventsService";


interface FilterEventsProps {
    type: string,
    payload: EventFiltersProps
}

function* fetchFilteredEventsAsync(action: FilterEventsProps) {
    try {
        const result = yield fetchFilteredEvents(action.payload)
        yield put(filterEventsSuccess(result))
    }
    catch (err) {
        yield put(filterEventsError())
    }
}

export function* watchFetchFilteredEventsAsync() {
    yield takeLatest(FILTER_EVENTS, fetchFilteredEventsAsync)
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