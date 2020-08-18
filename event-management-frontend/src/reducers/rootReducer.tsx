import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducers";
import HeaderReducer from "./HeaderEventCrudReducer";
import { ImagesReducer } from "./ImageReducer";
import LocationPageReducer from "./LocationPageReducer";

export default combineReducers({
    events: EventsPageReducer,
    eventCrud: HeaderReducer,
    eventImages: ImagesReducer,
    location: LocationPageReducer,
})