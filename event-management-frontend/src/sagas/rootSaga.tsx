import { all } from "redux-saga/effects";
import { watchFetchFilteredEventsAsync, watchFetchEventsAsync } from "./EventsPageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync()
    ]);
 }