import { put, takeLatest, call } from "redux-saga/effects";
import { locationFetchSucces, LocationActionTypes } from "../actions/LocationActions";
import { fetchLocationAPI } from "../api/HeaderEventCrudAPI";

function* fetchLocations() {
  const response = yield call(() => fetchLocationAPI());
  yield put(locationFetchSucces(response));
}

export function* fetchLocationsActionWatcher() {
  yield takeLatest(LocationActionTypes.LOCATION_FETCH, fetchLocations);
}
