import {takeEvery, put, call} from "redux-saga/effects";
import { fetchTicketsPaginated } from "../api/TicketsServiceAPI";
import {
    FETCH_TICKETS,
    fetchTicketsError,
    fetchTicketsRequest,
    fetchTicketsSuccess,
    OPEN, CLOSE, openDetails, closeDetails
} from "../actions/TicketsPageActions";
import {TicketFilters} from "../model/TicketFilters";

interface ActionType {
    payload: { page: number, filters: TicketFilters };
    type: string;
}

function* fetchTicketsAsync(action: ActionType) {
    yield put(fetchTicketsRequest())
    try {
        const result = yield call (() => fetchTicketsPaginated(action.payload.page, action.payload.filters))
        yield put(fetchTicketsSuccess(result))
    }
    catch (err) {
        yield put(fetchTicketsError())
    }
}

export function* watchFetchTicketsAsync() {
    yield takeEvery(FETCH_TICKETS, fetchTicketsAsync)
}

export function* watchOpenAsync() {
}

export function* watchCloseAsync() {
}



