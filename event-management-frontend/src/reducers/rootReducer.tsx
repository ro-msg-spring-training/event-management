import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import ReservePageReducer from "./ReservePageReducer";

export default combineReducers({
  events: EventsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  reserveTicket: ReservePageReducer,
});
