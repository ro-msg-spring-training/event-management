import { takeLatest, call, put } from "redux-saga/effects";
import { LOAD_EVENT, fetchEventRequest, fetchEventSuccess, fetchEventFailure, DELETE_EVENT, deleteEventRequest, deleteEventSuccess, deleteEventFailure, ADD_EVENT, addEventRequest, addEventSuccess, addEventFailure, editEventRequest, editEventSuccess, editEventFailure, EDIT_EVENT, LOAD_EVENT_WITH_LOCATIONS, fetchEventWithLocationSuccess } from "../actions/HeaderEventCrudActions";
import { fetchEventAPI, deleteEventAPI, addEventAPI, editEventAPI, updateImagesFromS3, fetchEventWithLocationsAPI } from "../api/HeaderEventCrudAPI";
import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";

interface Props {
  type: string,
  payload: string
}

interface AddProps {
  type: string,
  payload: { event: EventCrud, images: EventImage[] }
}

//-----------------------------------------LOAD EVENT
function* loadEventAsync(props: Props) {
  try {
    yield put(fetchEventRequest());
    const event = yield call(() => fetchEventAPI(props.payload));
    event.eventDto.id = parseInt(props.payload)
    yield put(fetchEventSuccess(event.eventDto))
  } catch (e) {
    yield put(fetchEventFailure(e))
  }
}

export function* loadEventWatcher() {
  yield takeLatest(LOAD_EVENT, loadEventAsync)
}

//-----------------------------------------LOAD EVENT WITH LOCATIONS
function* loadEventWithLocationsAsync(props: Props) {
  try {
    yield put(fetchEventRequest());
    const event = yield call(() => fetchEventWithLocationsAPI(props.payload));
    event.eventDto.id = parseInt(props.payload)
    yield put(fetchEventWithLocationSuccess(event))
  } catch (e) {
    yield put(fetchEventFailure(e))
  }
}

export function* loadEventWithLocationsWatcher() {
  yield takeLatest(LOAD_EVENT_WITH_LOCATIONS, loadEventWithLocationsAsync)
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
    const imagesURL = yield call(() => updateImagesFromS3(props.payload.images));
    const event: EventCrud = props.payload.event
    event.picturesUrlSave = imagesURL
    event.picturesUrlDelete = []
    yield call(() => addEventAPI(event));
    yield put(addEventSuccess())
  } catch (e) {
    yield put(addEventFailure(e))
  }
}

export function* addProductWatcher() {
  yield takeLatest(ADD_EVENT, addEventAsync)
}

//-----------------------------------------EDIT EVENT
function* editEventAsync(props: AddProps) {
  try {
    yield put(editEventRequest());
    const imagesURL = yield call(() => updateImagesFromS3(props.payload.images));
    const event: EventCrud = props.payload.event
    event.picturesUrlSave = imagesURL
    event.picturesUrlDelete = []
    yield call(() => editEventAPI(event));
    yield put(editEventSuccess())
  } catch (e) {
    yield put(editEventFailure(e))
  }
}

export function* editProductWatcher() {
  yield takeLatest(EDIT_EVENT, editEventAsync)
}