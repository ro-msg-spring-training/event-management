import { put, call, takeEvery } from "redux-saga/effects";
import {
  fetchHighlightedEventsRequest,
  fetchHighlightedEventsSuccess,
  fetchHighlightedEventsError,
} from "../actions/UserHomePageActions";
import { UserHomePageActionTypes } from "../types/UserHomePageActionTypes";
import { fetchHighlightedEvents } from "../api/UserHomePageAPI";

function* fetchHighlightedEventsAsync() {
  yield put(fetchHighlightedEventsRequest());
  try {
    const events = yield call(() => fetchHighlightedEvents());
    yield put(fetchHighlightedEventsSuccess(events));
  } catch (error) {
    yield put(fetchHighlightedEventsError());
  }
}

export function* watchFetchHighlightedEventsAsync() {
  yield takeEvery(UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS, fetchHighlightedEventsAsync);
}
