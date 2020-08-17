import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import { ImagesReducer } from "./ImageReducer";

export default combineReducers({
    events: EventsPageReducer,
    event: HeaderReducer,
    eventCrud: ImagesReducer
})