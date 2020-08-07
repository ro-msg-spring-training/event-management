import { createStore, combineReducers, applyMiddleware } from 'redux';
import { EventsPageReducer, EventsPageState } from '../reducers/EventsPageReducers';
import rootSaga from '../sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
    eventReducer: EventsPageReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export interface AppState {
    eventsList: EventsPageState;
}