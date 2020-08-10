import { all } from "redux-saga/effects";
import { fetchProdictListWatcher } from "./EventsPageSaga";

export default function* rootSaga() {
    yield all([
        fetchProdictListWatcher()
    ]);
 }