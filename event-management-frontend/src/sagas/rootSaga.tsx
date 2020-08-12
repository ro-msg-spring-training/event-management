import { all } from "redux-saga/effects";
import { watchFetchFilteredEventsAsync, watchFetchEventsAsync } from "./EventsPageSaga";
import { watchUploadEventImagesAsync, watchFetchEventImagesAsync } from "./ImageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchUploadEventImagesAsync(),
        watchFetchEventImagesAsync()
    ]);
 }