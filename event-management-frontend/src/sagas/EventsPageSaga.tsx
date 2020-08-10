import { FILTER_EVENTS, filterEventsRequest } from "../actions/EventsPageActions";

import { takeLatest, call } from "redux-saga/effects";
import { EventFiltersProps } from "../types/EventFiltersProps";


interface FilterEventsProps {
    type: string,
    payload: EventFiltersProps
}

function* filterEventsAsync(action: FilterEventsProps) {
    yield call(() => filterEventsRequest(action.payload))
}

export function* fetchProdictListWatcher() {
    yield takeLatest(FILTER_EVENTS, filterEventsAsync)
}