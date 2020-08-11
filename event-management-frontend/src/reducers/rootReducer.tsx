import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import { ImagesReducer } from "./ImageReducer";

export default combineReducers({
    events: EventsPageReducer,
    eventCrud: ImagesReducer
})