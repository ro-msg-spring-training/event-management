import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import { ImagesReducer } from "./ImageReducer";
import LocationPageReducer from "./LocationPageReducer";

export default combineReducers({
    events: EventsPageReducer,
    event: HeaderReducer,
    eventImages: ImagesReducer,
    location: LocationPageReducer,
})