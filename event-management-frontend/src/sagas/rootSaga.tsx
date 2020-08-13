import { all } from "redux-saga/effects";
import {watchFetchFilteredEventsAsync, watchFetchEventsAsync, watchSortEventsAsync, watchPrevPageAsync, watchNextPageAsync} from "./EventsPageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchSortEventsAsync(),
        watchNextPageAsync(),
        watchPrevPageAsync()
    ]);
 }