import { createStore, combineReducers } from 'redux';
import { EventsPageReducer, EventsPageState } from '../reducers/EventsPageReducers';

const rootReducer = combineReducers({
    eventReducer: EventsPageReducer,
});

export const store = createStore(
    rootReducer,
);

export interface AppState {
    eventsList: EventsPageState;
}