import {
  loadEventWatcher,
  deleteProductWatcher,
  addProductWatcher,
  editProductWatcher
} from "../sagas/HeaderEventCrudSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    loadEventWatcher(),
    deleteProductWatcher(),
    addProductWatcher(),
    editProductWatcher()
  ])
}