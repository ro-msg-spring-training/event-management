import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_EVENT, fetchEventRequest, fetchEventSuccess, fetchEventFailure, DELETE_EVENT, deleteEventRequest, deleteEventSuccess, deleteEventFailure, ADD_EVENT, addEventRequest, addEventSuccess, addEventFailure } from "../actions/HeaderEventCrudActions";
import { fetchEventAPI, deleteEventAPI, addEventAPI } from "../api/HeaderEventCrudAPI";
import { EventCrud } from "../model/EventCrud";

interface Props {
  type: string,
  payload: string
}

interface AddProps {
  type: string,
  payload: EventCrud
}

//-----------------------------------------LOAD EVENT
function* loadEventAsync(props: Props) {
  try {
    yield put(fetchEventRequest());
    const event = yield call(() => fetchEventAPI(props.payload));
    yield put(fetchEventSuccess(event))
  } catch (e) {
    console.log("Error");
    yield put(fetchEventFailure(e))
  }
}

export function* loadEventWatcher() {
  yield takeLatest(LOAD_EVENT, loadEventAsync)
}

//-----------------------------------------DELETE EVENT
function* deleteEventAsync(props: Props) {
  try {
    yield put(deleteEventRequest());
    yield call(() => deleteEventAPI(props.payload));
    yield put(deleteEventSuccess())
  } catch (e) {
    yield put(deleteEventFailure(e))
  }
}

export function* deleteProductWatcher() {
  yield takeLatest(DELETE_EVENT, deleteEventAsync)
}

//-----------------------------------------ADD EVENT
function* addEventAsync(props: AddProps) {
  try {
    yield put(addEventRequest());
    yield call(() => addEventAPI(props.payload));
    yield put(addEventSuccess())
  } catch (e) {
    yield put(addEventFailure(e))
  }
}

export function* addProductWatcher() {
  yield takeLatest(ADD_EVENT, addEventAsync)
}