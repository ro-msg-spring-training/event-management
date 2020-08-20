import { all } from "redux-saga/effects";
import {watchFetchFilteredEventsAsync, watchFetchEventsAsync, watchSortEventsAsync, watchPrevPageAsync, watchNextPageAsync, watchFetchCustomEventsAsync} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher } from "./HeaderEventCrudSaga";
import { fetchLocationsActionWatcher } from "./LocationPageSaga";

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
        
        fetchLocationsActionWatcher(),

        watchFetchCustomEventsAsync(),

    ]);
 }
