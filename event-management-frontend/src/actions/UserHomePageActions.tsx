export const FETCH_HIGHLIGHTED_EVENTS = "FETCH_HIGHLIGHTED_EVENTS";
export const FETCH_HIGHLIGHTED_EVENTS_REQUEST = "FETCH_HIGHLIGHTED_EVENTS_REQUEST";
export const FETCH_HIGHLIGHTED_EVENTS_SUCCESS = "FETCH_HIGHLIGHTED_EVENTS_SUCCESS";
export const FETCH_HIGHLIGHTED_EVENTS_ERROR = "FETCH_HIGHLIGHTED_EVENTS_ERROR";

export const fetchHighlightedEvents = () => {
  return {
    type: FETCH_HIGHLIGHTED_EVENTS,
  };
};

export const fetchHighlightedEventsRequest = () => {
  return {
    type: FETCH_HIGHLIGHTED_EVENTS_REQUEST,
  };
};

export const fetchHighlightedEventsSuccess = (events: any) => {
  return {
    type: FETCH_HIGHLIGHTED_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchHighlightedEventsError = () => {
  return {
    type: FETCH_HIGHLIGHTED_EVENTS_ERROR,
  };
};
