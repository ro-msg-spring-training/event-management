import { FILTER_EVENTS, filterEventsFromService, FETCH_EVENTS, fetchEventsFromService, fetchEventsRequest, fetchEventsSuccess } from "../actions/EventsPageActions";

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
    yield put(fetchEventsRequest())

    fetchEvents()
    
    yield put(fetchEventsSuccess([]))
    //     .then(result => {
    //         console.log('heeeloe')
    //         fetchEventsSuccess(result)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         fetchEventsError()
    //     })

    // yield call(()=> fetchEventsFromService())
}

export function* watchFetchEventsAsync() {
    yield takeEvery(FETCH_EVENTS, fetchEventsAsync)
}