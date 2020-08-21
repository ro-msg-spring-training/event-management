import { takeEvery, put } from "redux-saga/effects";
import { fetchTickets } from "../api/TicketsServiceAPI";
import {
    FETCH_TICKETS,
    fetchTicketsError,
    fetchTicketsRequest,
    fetchTicketsSuccess
} from "../actions/TicketsPageActions";


function* fetchTicketsAsync() {
    yield put(fetchTicketsRequest())
    try {
        const result = yield fetchTickets()
        yield put(fetchTicketsSuccess(result))
    }
    catch (err) {
        yield put(fetchTicketsError())
    }
}

export function* watchFetchTicketsAsync() {
    yield takeEvery(FETCH_TICKETS, fetchTicketsAsync)
}

