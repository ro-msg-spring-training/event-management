import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducer";
import { TicketsPageReducer } from "./TicketsPageReducer";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import { AdminHomePageReducer } from "./AdminHomePageReducer";

export default combineReducers({
    events: EventsPageReducer,
    tickets: TicketsPageReducer,
    eventCrud: HeaderReducer,
    location: LocationPageReducer,
    adminHomeCard: AdminHomePageReducer,
})
