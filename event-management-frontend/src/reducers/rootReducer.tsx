import { combineReducers } from "redux";
import { FetchEventsReducer} from "./fetchEventsReducer";

export default combineReducers({
    events: FetchEventsReducer
})