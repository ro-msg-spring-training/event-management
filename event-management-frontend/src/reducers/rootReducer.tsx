import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import LoginPageReducer from "./LoginPageReducer";

export default combineReducers({
  events: EventsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  login: LoginPageReducer,
});
