import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga';
import { EventsPageState } from "../reducers/EventsPageReducers";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export interface AppState {
    events: EventsPageState,
}
