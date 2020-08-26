import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_TICKET_CATEGORIES, fetchTicketCategoriesRequest, fetchTicketCategoriesSuccess, fetchTicketCategoriesFailure } from "../actions/TicketReservationActions";
import { fetchTicketCategoriesAPI } from "../api/TicketReservationAPI";

interface Props {
  type: string,
  payload: string
}

//-----------------------------------------LOAD TICKET CATEGORIES
function* loadTicketCategoriesAsync(props: Props) {
  try {
    yield put(fetchTicketCategoriesRequest());
    const ticketCategories = yield call(() => fetchTicketCategoriesAPI(props.payload));
    yield put(fetchTicketCategoriesSuccess(ticketCategories))
  } catch (e) {
    yield put(fetchTicketCategoriesFailure(e))
  }
}

export function* loadTicketCategoriesWatcher() {
  yield takeLatest(LOAD_TICKET_CATEGORIES, loadTicketCategoriesAsync)
}



