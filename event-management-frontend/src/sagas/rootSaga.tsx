import { all } from "redux-saga/effects";
import {watchFetchFilteredEventsAsync, watchFetchEventsAsync, watchSortEventsAsync, watchPrevPageAsync, watchNextPageAsync} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher } from "./HeaderEventCrudSaga";
import { watchUploadEventImagesAsync, watchFetchEventImagesAsync } from "./ImageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchSortEventsAsync(),
        watchNextPageAsync(),
        watchPrevPageAsync(),
        
        loadEventWatcher(),
        deleteProductWatcher(),
        addProductWatcher(),
        editProductWatcher(),
        
        watchUploadEventImagesAsync(),
        watchFetchEventImagesAsync()
    ]);
 }