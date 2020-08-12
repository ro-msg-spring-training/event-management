import { all } from "redux-saga/effects";
import {watchFetchFilteredEventsAsync, watchFetchEventsAsync, watchSortEventsAsync} from "./EventsPageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchSortEventsAsync()
    ]);
 }