import { takeLatest, call, put } from 'redux-saga/effects';
import {
  ADD_BOOKINGS,
  LOAD_TICKET_CATEGORIES,
  fetchTicketCategoriesRequest,
  fetchTicketCategoriesSuccess,
  fetchTicketCategoriesFailure,
  addBookingsRequest,
  addBookingsSuccess,
  addBookingsFailure,
} from '../actions/TicketReservationActions';
import { fetchTicketCategoriesAPI, addBookingsAPI } from '../api/TicketReservationAPI';
import Booking from '../model/Booking';

interface Props {
  type: string;
  payload: string;
}

interface AddProps {
  type: string;
  payload: { bookings: Booking };
}

//-----------------------------------------LOAD TICKET CATEGORIES
function* loadTicketCategoriesAsync(props: Props) {
  try {
    yield put(fetchTicketCategoriesRequest());
    const ticketCategories = yield call(() => fetchTicketCategoriesAPI(props.payload));
    yield put(fetchTicketCategoriesSuccess(ticketCategories));
  } catch (e) {
    yield put(fetchTicketCategoriesFailure(e));
  }
}

export function* loadTicketCategoriesWatcher() {
  yield takeLatest(LOAD_TICKET_CATEGORIES, loadTicketCategoriesAsync);
}

//-----------------------------------------ADD BOOKINGS
function* addBookingsAsync(props: AddProps) {
  try {
    yield put(addBookingsRequest());
    const res = yield call(() => addBookingsAPI(props.payload.bookings));
    console.log("res", res);
    yield put(addBookingsSuccess());
  } catch (e) {
    console.log("ERROR from saga", e);
    yield put(addBookingsFailure(e));
  }
}

export function* addBookingsWatcher() {
  yield takeLatest(ADD_BOOKINGS, addBookingsAsync);
}
