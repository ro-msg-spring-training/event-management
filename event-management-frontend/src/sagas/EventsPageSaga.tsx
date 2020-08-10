import {
    FILTER_EVENTS,
    filterEventsFromService,
    FETCH_EVENTS,
    fetchEventsSuccess,
    fetchEventsError
} from "../actions/EventsPageActions";

import { takeLatest, call, takeEvery, put } from "redux-saga/effects";
import { EventFiltersProps } from "../types/EventFiltersProps";
import { fetchEvents } from "../services/EventsService";


interface FilterEventsProps {
    type: string,
    payload: EventFiltersProps
}

function* fetchFilteredEventsAsync(action: FilterEventsProps) {
    yield call(() => filterEventsFromService(action.payload))
}

export function* watchFetchFilteredEventsAsync() {
    yield takeLatest(FILTER_EVENTS, fetchFilteredEventsAsync)
}

function* fetchEventsAsync() {
    try {
        const result = yield fetchEvents();
        yield put(fetchEventsSuccess(result));
    } catch (err) {
        yield put(fetchEventsError());
    }
}

export function* watchFetchEventsAsync() {
    yield takeEvery(FETCH_EVENTS, fetchEventsAsync)
}