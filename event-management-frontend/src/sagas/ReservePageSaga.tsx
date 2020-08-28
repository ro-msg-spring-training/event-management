import { put, takeLatest, call } from "redux-saga/effects";
import { ReserveTicketActionTypes, reserveEventFetchSucces } from "../actions/ReserveTicketsActions";
import { fetchReserveEventAPI } from "../api/ReservePageAPI";

interface Props {
  type: string;
  id: number;
}

function* fetchReserveEvent(props: Props) {
  const response = yield call(() => fetchReserveEventAPI(props.id));
  yield put(reserveEventFetchSucces(response));
}

export function* fetchReserveEventActionWatcher() {
  yield takeLatest(ReserveTicketActionTypes.RESERVE_EVENT_FETCH, fetchReserveEvent);
}
