import { takeEvery, put, call } from "redux-saga/effects";
import { FETCH_USER_EVENTS, fetchUserEventsSuccess, fetchUserEventsError, fetchUserEventsRequest } from "../actions/UserEventListActions";
import { fetchEvents } from "../api/UserEventListAPI";

function* fetchUserEventsAsync(action: any) {
    yield put(fetchUserEventsRequest());
    try {
        const result = yield call (() => fetchEvents(action.payload.page, action.payload.limit));
        console.log('rezultatul de la server', result)
        yield put(fetchUserEventsSuccess(result));
    }
    catch (err) {
        yield put(fetchUserEventsError());
    }
}

export function* watchFetchUserEventsAsync() {
    yield takeEvery(FETCH_USER_EVENTS, fetchUserEventsAsync);
}
