import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import { AdminHomePageReducer } from "./AdminHomePageReducer";

export default combineReducers({
  events: EventsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  adminHomeCard: AdminHomePageReducer,
});
