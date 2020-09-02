import { takeEvery, put, call } from 'redux-saga/effects';
import {
  FETCH_USER_EVENTS,
  fetchUserEventsSuccess,
  fetchUserEventsError,
  fetchUserEventsRequest,
  fetchUserEventsLocationsSuccess,
  fetchUserEventsLocationsError,
  FETCH_USER_EVENTS_LOCATIONS,
  fetchUserEventsLocationsRequest,
} from '../actions/UserEventsPageActions';
import { fetchEvents, fetchEventsLocations } from '../api/UserEventsPageAPI';
import { UserEventIsFilterType } from '../model/userEventsPage/UserEventIsFilterType';

function* fetchUserEventsAsync(action: any) {
  yield put(fetchUserEventsRequest());
  try {
    if (action.payload.isFilter !== UserEventIsFilterType.NOT_IN_USE) {
      const result = yield call(() => fetchEvents(action.payload.page, action.payload.limit, action.payload.filters));
      yield put(fetchUserEventsSuccess(result));
    } else {
      const result = yield call(() => fetchEvents(action.payload.page, action.payload.limit));
      yield put(fetchUserEventsSuccess(result));
    }
  } catch (err) {
    yield put(fetchUserEventsError());
  }
}

export function* watchFetchUserEventsAsync() {
  yield takeEvery(FETCH_USER_EVENTS, fetchUserEventsAsync);
}

function* fetchUserEventsLocationsAsync() {
  yield put(fetchUserEventsLocationsRequest());
  try {
    const result = yield call(() => fetchEventsLocations());
    yield put(fetchUserEventsLocationsSuccess(result));
  } catch (err) {
    yield put(fetchUserEventsLocationsError());
  }
}

export function* watchFetchUserEventsLocationsAsync() {
  yield takeEvery(FETCH_USER_EVENTS_LOCATIONS, fetchUserEventsLocationsAsync);
}
