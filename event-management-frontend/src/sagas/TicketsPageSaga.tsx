import { takeEvery, put } from "redux-saga/effects";
import { fetchTickets } from "../api/TicketsServiceAPI";
import {
    FETCH_TICKETS,
    fetchTicketsError,
    fetchTicketsRequest,
    fetchTicketsSuccess, UPDATE_TICKETS
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

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
function* ticketUpdateAsync() {
    //console.log("saga")
}

export function* watchTicketUpdateAsync() {
    yield takeEvery(UPDATE_TICKETS, ticketUpdateAsync)
}

