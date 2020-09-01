import { all } from "redux-saga/effects";
import {
  watchFetchFilteredEventsAsync,
  watchFetchEventsAsync,
  watchFetchCustomEventsAsync,
  watchFetchHomeEventsAsync,
  watchFetchCustomHomeEventsAsync,
} from "./EventsPageSaga";
import { loadEventWatcher, deleteProductWatcher, addProductWatcher, editProductWatcher } from "./HeaderEventCrudSaga";
import { fetchLocationsActionWatcher } from "./LocationPageSaga";
import { watchFetchTicketsAsync } from "./TicketsPageSaga";
import { fetchUpcomingEventsActionWatcher, fetchHistoryEventsActionWatcher } from "./AdminHomePageSaga";
import { watchFetchUserEventsAsync, watchFetchUserEventsLocationsAsync } from "./UserEventsPageSaga";
import {loadEventWithLocationsWatcher} from "./UserEventDetailsSaga";
import {
  watchFetchBookingsAsync,
  watchFetchUserPastEventsAsync,
  watchFetchUserUpcomingEventsAsync,
  watchFetchHighlightedEventsAsync,
} from "./UserHomePageSaga";


export default function* rootSaga() {
  yield all([
    watchFetchFilteredEventsAsync(),
    watchFetchEventsAsync(),
    watchFetchHomeEventsAsync(),
    watchFetchCustomEventsAsync(),
    watchFetchCustomHomeEventsAsync(),

    watchFetchTicketsAsync(),

    watchFetchBookingsAsync(),
    watchFetchUserPastEventsAsync(),
    watchFetchUserUpcomingEventsAsync(),

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

    loadEventWithLocationsWatcher(),

    watchFetchHighlightedEventsAsync(),
  ]);
}
