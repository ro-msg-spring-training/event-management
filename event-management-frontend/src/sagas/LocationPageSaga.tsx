import { put, takeLatest, call } from "redux-saga/effects";
import {
  locationFetchSucces,
  LocationActionTypes,
} from "../actions/LocationActions";
import { fetchLocation } from "../api/HeaderEventCrudAPI";

function* fetchLocations() {
  const response = yield call(() => fetchLocation());
  yield put(locationFetchSucces(response));
}

export function* fetchLocationsActionWatcher() {
  yield takeLatest(LocationActionTypes.LOCATION_FETCH, fetchLocations);
}
