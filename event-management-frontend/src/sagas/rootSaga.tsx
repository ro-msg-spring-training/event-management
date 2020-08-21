import { all } from "redux-saga/effects";
import {
    watchFetchFilteredEventsAsync, watchFetchEventsAsync,
    watchSortEventsAsync, watchPrevPageAsync,
    watchNextPageAsync, watchFetchCustomEventsAsync, watchFetchHomeEventsAsync,
    watchFetchCustomHomeEventsAsync
} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher } from "./HeaderEventCrudSaga";
import { fetchLocationsActionWatcher } from "./LocationPageSaga";
import { watchFetchTicketsAsync } from "./TicketsPageSaga";

export default function* rootSaga() {
    yield all([
        watchFetchFilteredEventsAsync(),
        watchFetchEventsAsync(),
        watchFetchHomeEventsAsync(),
        watchSortEventsAsync(),
        watchNextPageAsync(),
        watchPrevPageAsync(),
        
        loadEventWatcher(),
        deleteProductWatcher(),
        addProductWatcher(),
        editProductWatcher(),
        
        fetchLocationsActionWatcher(),

        watchFetchCustomEventsAsync(),
        watchFetchCustomHomeEventsAsync(),

        watchFetchTicketsAsync()
    ]);
 }
