import {
  UserHomePageActionTypes,
  FetchHighlightedEventsAction,
  FetchHighlightedEventsSuccessAction,
  FetchHighlightedEventsRequestAction,
  FetchHighlightedEventsErrorAction,
} from "../types/UserHomePageActionTypes";
import { HighlightedEvent } from "../reducers/UserHomePageReducer";

export const fetchHighlightedEvents = (): FetchHighlightedEventsAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS,
  };
};

export const fetchHighlightedEventsRequest = (): FetchHighlightedEventsRequestAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST,
  };
};

export const fetchHighlightedEventsSuccess = (events: HighlightedEvent[]): FetchHighlightedEventsSuccessAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS,
    events: events,
  };
};

export const fetchHighlightedEventsError = (): FetchHighlightedEventsErrorAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR,
  };
};
