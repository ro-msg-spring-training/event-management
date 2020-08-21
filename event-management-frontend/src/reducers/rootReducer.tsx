import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import { UserEventsReducer } from "./UserEventListReducer";

export default combineReducers({
    events: EventsPageReducer,
    eventCrud: HeaderReducer,
    location: LocationPageReducer,
    userEvents: UserEventsReducer,
})