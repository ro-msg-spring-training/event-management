import { takeLatest, put, call } from 'redux-saga/effects';
import {
  LOAD_EVENT_WITH_LOCATIONS,
  fetchEventWithLocationRequest,
  fetchEventWithLocationSuccess,
  fetchEventWithLocationFailure,
} from '../actions/UserEventDetailsActions';
import { fetchEventWithLocationsAPI } from '../api/UserEventDetailsAPI';

interface Props {
  type: string;
  payload: string;
}

//-----------------------------------------LOAD EVENT WITH LOCATIONS
function* loadEventWithLocationsAsync(props: Props) {
  try {
    yield put(fetchEventWithLocationRequest());
    const event = yield call(() => fetchEventWithLocationsAPI(props.payload));
    event.eventDto.id = parseInt(props.payload);
    yield put(fetchEventWithLocationSuccess(event));
  } catch (e) {
    yield put(fetchEventWithLocationFailure(e));
  }
}

export function* loadEventWithLocationsWatcher() {
  yield takeLatest(LOAD_EVENT_WITH_LOCATIONS, loadEventWithLocationsAsync);
}
