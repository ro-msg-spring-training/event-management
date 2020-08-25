import {takeEvery, put, call} from "redux-saga/effects";
import { fetchTicketsPaginated } from "../api/TicketsServiceAPI";
import {
    FETCH_TICKETS,
    fetchTicketsError,
    fetchTicketsRequest,
    fetchTicketsSuccess
} from "../actions/TicketsPageActions";


function* fetchTicketsAsync(action: any) {
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


