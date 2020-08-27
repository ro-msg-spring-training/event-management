import { put, call, takeEvery } from "redux-saga/effects";
import {
  fetchHighlightedEventsRequest,
  fetchHighlightedEventsSuccess,
  fetchHighlightedEventsError,
  FETCH_HIGHLIGHTED_EVENTS,
} from "../actions/UserHomePageActions";
import { fetchHighlightedEvents } from "../api/UserHomePageAPI";

function* fetchHighlightedEventsAsync(action: any) {
  yield put(fetchHighlightedEventsRequest());
  try {
    const events = yield call(() => fetchHighlightedEvents());
    yield put(fetchHighlightedEventsSuccess(events));
  } catch (error) {
    console.log("Error: ", error);
    yield put(fetchHighlightedEventsError());
  }
}

export function* watchFetchHighlightedEventsAsync() {
  yield takeEvery(FETCH_HIGHLIGHTED_EVENTS, fetchHighlightedEventsAsync);
}
