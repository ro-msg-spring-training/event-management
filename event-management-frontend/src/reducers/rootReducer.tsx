import { combineReducers } from "redux";
import { EventsPageReducer } from "./EventsPageReducer";
import { TicketsPageReducer } from "./TicketsPageReducer";
import HeaderReducer from "./HeaderEventCrudReducer";
import LocationPageReducer from "./LocationPageReducer";
import { UserHomePageReducer } from "./UserHomePageReducer";
import { AdminHomePageReducer } from "./AdminHomePageReducer";
import { UserEventsReducer } from "./UserEventsPageReducer";
import UserEventDetailsReducer from "./UserEventDetailsReducer";


export default combineReducers({
  events: EventsPageReducer,
  tickets: TicketsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  adminHomeCard: AdminHomePageReducer,
  userEvents: UserEventsReducer,
  eventWithLocation: UserEventDetailsReducer,
  userHome: UserHomePageReducer,
});
