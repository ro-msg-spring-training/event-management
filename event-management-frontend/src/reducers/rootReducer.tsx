import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import ReservePageReducer from "./ReservePageReducer";
import TicketCategoriesReducer from "./TicketReservationReducer";

export default combineReducers({
  events: EventsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  reserveTicket: ReservePageReducer,
  ticketCategories: TicketCategoriesReducer,
});
