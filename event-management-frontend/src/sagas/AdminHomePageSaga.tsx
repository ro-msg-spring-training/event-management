import { put, takeLatest, call } from 'redux-saga/effects';
import { upcomingEventsFetchSucces, historyEventsFetchSucces } from '../actions/AdminHomePageActions';
import { fetchUpcomingEventsAPI, fetchHistoryEventsAPI } from '../api/AdminHomePageAPI';
import { AdminHomePageActionTypes } from '../types/AdminHomePageActionTypes';

function* fetchUpcomingEvents() {
  const response = yield call(() => fetchUpcomingEventsAPI());
  yield put(upcomingEventsFetchSucces(response));
}
export function* fetchUpcomingEventsActionWatcher() {
  yield takeLatest(AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH, fetchUpcomingEvents);
}

function* fetchHistoryEvents() {
  const response = yield call(() => fetchHistoryEventsAPI());
  yield put(historyEventsFetchSucces(response));
}
export function* fetchHistoryEventsActionWatcher() {
  yield takeLatest(AdminHomePageActionTypes.HISTORY_EVENTS_FETCH, fetchHistoryEvents);
}
