import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";

export default combineReducers({
    events: EventsPageReducer,
    event: HeaderReducer,
})