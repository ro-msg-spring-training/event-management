import { all } from "redux-saga/effects";
import {
    watchFetchFilteredEventsAsync, watchFetchEventsAsync,
    watchSortEventsAsync, watchPrevPageAsync,
    watchNextPageAsync, watchFetchCustomEventsAsync, watchFetchHomeEventsAsync,
    watchFetchCustomHomeEventsAsync
} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher, loadEventWithLocationsWatcher } from "./HeaderEventCrudSaga";
import { fetchLocationsActionWatcher } from "./LocationPageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchFetchHomeEventsAsync(),
        watchSortEventsAsync(),
        watchNextPageAsync(),
        watchPrevPageAsync(),
        
        loadEventWatcher(),
        loadEventWithLocationsWatcher(),
        deleteProductWatcher(),
        addProductWatcher(),
        editProductWatcher(),
        
        fetchLocationsActionWatcher(),

        watchFetchCustomEventsAsync(),
        watchFetchCustomHomeEventsAsync()
    ]);
 }
