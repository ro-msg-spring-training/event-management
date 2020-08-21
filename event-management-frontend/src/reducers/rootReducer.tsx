import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducer";
import { TicketsPageReducer } from "./TicketsPageReducer";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";

export default combineReducers({
    events: EventsPageReducer,
    tickets: TicketsPageReducer,
    eventCrud: HeaderReducer,
    location: LocationPageReducer,
})