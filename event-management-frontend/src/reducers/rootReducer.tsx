import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";

export default combineReducers({
    events: EventsPageReducer,
})