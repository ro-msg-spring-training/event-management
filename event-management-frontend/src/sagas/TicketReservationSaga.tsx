import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_TICKET_CATEGORIES, fetchTicketCategoriesRequest, fetchTicketCategoriesSuccess, fetchTicketCategoriesFailure, addTicketCategoriesRequest, addTicketCategoriesSuccess, addTicketCategoriesFailure, ADD_BOOKINGS } from "../actions/TicketReservationActions";
import { fetchTicketCategoriesAPI, addBookingsAPI } from "../api/TicketReservationAPI";
import Booking from "../model/Booking";
import { ADD_EVENT } from "../actions/HeaderEventCrudActions";

interface Props {
  type: string,
  payload: string
}

interface AddProps {
  type: string,
  payload: {bookings: Booking}
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

//-----------------------------------------ADD BOOKINGS
function* addBookingsAsync(props: AddProps) {
  try {
    yield put(addTicketCategoriesRequest());
    yield call(() => addBookingsAPI(props.payload.bookings));
    yield put(addTicketCategoriesSuccess())
  } catch (e) {
    yield put(addTicketCategoriesFailure(e))
  }
}

export function* addBookingsWatcher() {
  yield takeLatest(ADD_BOOKINGS, addBookingsAsync)
}



