import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import TicketCategoriesReducer from "./TicketReservationReducer";

export default combineReducers({
    events: EventsPageReducer,
    eventCrud: HeaderReducer,
    location: LocationPageReducer,
    ticketCategories: TicketCategoriesReducer,
})