import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import { UserHomePageReducer } from "./UserHomePageReducer";

export default combineReducers({
  events: EventsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  userHomePage: UserHomePageReducer,
});
