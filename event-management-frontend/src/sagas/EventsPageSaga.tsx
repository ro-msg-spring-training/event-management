import { FILTER_EVENTS, filterEventsRequest, filterEventsError, filterEventsSuccess } from "../actions/EventsPageActions";

import { put, takeLatest } from "redux-saga/effects";

function* filterEventsAsync() {
    try {
        yield put(filterEventsRequest())
        // to call the API
        yield put(filterEventsSuccess());
    }
    catch{
        yield put(filterEventsError());
    }
}

export function* fetchProdictListWatcher() {
    yield takeLatest(FILTER_EVENTS, filterEventsAsync)
}