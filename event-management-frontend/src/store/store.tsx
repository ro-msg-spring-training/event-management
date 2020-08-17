import LocationPageReducer, {
  LocationPageState,
} from "../reducers/LocationPageReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";

const rootReducer = combineReducers({
  location: LocationPageReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export interface AppState {
  location: LocationPageState;
}

export default store;
