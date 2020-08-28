import { all } from "redux-saga/effects";
import {
  watchFetchFilteredEventsAsync,
  watchFetchEventsAsync,
  watchSortEventsAsync,
  watchPrevPageAsync,
  watchNextPageAsync,
  watchFetchCustomEventsAsync,
  watchFetchHomeEventsAsync,
  watchFetchCustomHomeEventsAsync,
} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher } from "./HeaderEventCrudSaga";
import { fetchLocationsActionWatcher } from "./LocationPageSaga";
import { watchFetchTicketsAsync, watchOpenAsync, watchCloseAsync } from "./TicketsPageSaga";
import { fetchUpcomingEventsActionWatcher, fetchHistoryEventsActionWatcher } from "./AdminHomePageSaga";
import { watchFetchUserEventsAsync, watchFetchUserEventsLocationsAsync } from "./UserEventListSaga";


export default function* rootSaga() {
  yield all([
    watchFetchFilteredEventsAsync(),
    watchFetchEventsAsync(),
    watchFetchHomeEventsAsync(),
    watchSortEventsAsync(),
    watchNextPageAsync(),
    watchPrevPageAsync(),
    watchFetchCustomEventsAsync(),
    watchFetchCustomHomeEventsAsync(),

    watchFetchTicketsAsync(),

    loadEventWatcher(),
    deleteProductWatcher(),
    addProductWatcher(),
    editProductWatcher(),

    fetchLocationsActionWatcher(),

    watchFetchCustomEventsAsync(),
    watchFetchCustomHomeEventsAsync(),

    fetchUpcomingEventsActionWatcher(),
    fetchHistoryEventsActionWatcher(),

    watchFetchUserEventsAsync(),
    watchFetchUserEventsLocationsAsync(),

    watchOpenAsync(),
    watchCloseAsync(),

    loadEventWithLocationsWatcher(),
  ]);
}

