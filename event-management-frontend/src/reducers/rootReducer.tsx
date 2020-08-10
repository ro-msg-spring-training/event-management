import { combineReducers } from "redux";
import { FetchEventsReducer} from "./fetchEventsReducer";
import { EventsPageReducer } from "./EventsPageReducers";

export default combineReducers({
    eventReducer: EventsPageReducer,
    events: FetchEventsReducer
})