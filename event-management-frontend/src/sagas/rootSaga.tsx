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
import { loadTicketCategoriesWatcher, addBookingsWatcher } from "./TicketReservationSaga";
import { fetchReserveEventActionWatcher } from "./ReservePageSaga";

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

    loadTicketCategoriesWatcher(),
    addBookingsWatcher(),

    loadEventWatcher(),
    deleteProductWatcher(),
    addProductWatcher(),
    editProductWatcher(),

    fetchLocationsActionWatcher(),

    fetchReserveEventActionWatcher(),
  ]);
}
