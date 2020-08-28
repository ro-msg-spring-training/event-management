import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import { EventsPageState } from "../reducers/EventsPageReducer";
import { LocationPageState } from "../reducers/LocationPageReducer";
import { EventState } from "../reducers/HeaderEventCrudReducer";
import { TicketsPageState } from "../reducers/TicketsPageReducer";
import { OccupancyCardsState } from "../reducers/AdminHomePageReducer";
import { UserEventsPageState } from "../reducers/UserEventsPageReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export interface AppState {
  events: EventsPageState;
  eventCrud: EventState;
  location: LocationPageState;
  tickets: TicketsPageState;
  adminHomeCard: OccupancyCardsState;
  userEvents: UserEventsPageState;
}
