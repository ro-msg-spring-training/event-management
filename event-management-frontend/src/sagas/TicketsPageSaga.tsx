import {takeEvery, put, call} from "redux-saga/effects";
import { fetchTicketsPaginated } from "../api/TicketsServiceAPI";
import {
    FETCH_TICKETS,
    fetchTicketsError,
    fetchTicketsRequest,
    fetchTicketsSuccess,
    OPEN, CLOSE, openDetails, closeDetails
} from "../actions/TicketsPageActions";

interface ActionType {
    payload: { page: number };
    type: string;
}

function* fetchTicketsAsync(action: ActionType) {
    yield put(fetchTicketsRequest())
    try {
        const result = yield call (() => fetchTicketsPaginated(action.payload.page))
        yield put(fetchTicketsSuccess(result))
    }
    catch (err) {
        yield put(fetchTicketsError())
    }
}

export function* watchFetchTicketsAsync() {
    yield takeEvery(FETCH_TICKETS, fetchTicketsAsync)
}

function *openAsync() {
    //yield put(openDetails())
}

export function* watchOpenAsync() {
  //  yield takeEvery(OPEN, openAsync)
}

function *closeAsync() {
//    yield put(closeDetails())
}

export function* watchCloseAsync() {
    //yield takeEvery(CLOSE, closeAsync)
}


