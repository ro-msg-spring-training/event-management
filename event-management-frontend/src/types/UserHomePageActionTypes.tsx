import { HighlightedEvent } from "../reducers/UserHomePageReducer";

export enum UserHomePageActionTypes {
  FETCH_HIGHLIGHTED_EVENTS = "FETCH_HIGHLIGHTED_EVENTS",
  FETCH_HIGHLIGHTED_EVENTS_REQUEST = "FETCH_HIGHLIGHTED_EVENTS_REQUEST",
  FETCH_HIGHLIGHTED_EVENTS_SUCCESS = "FETCH_HIGHLIGHTED_EVENTS_SUCCESS",
  FETCH_HIGHLIGHTED_EVENTS_ERROR = "FETCH_HIGHLIGHTED_EVENTS_ERROR",
}

export class FetchHighlightedEventsAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS;
}

export class FetchHighlightedEventsRequestAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST;
}

export class FetchHighlightedEventsSuccessAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS;
  public events: HighlightedEvent[];

  constructor(events: HighlightedEvent[]) {
    this.events = events;
  }
}

export class FetchHighlightedEventsErrorAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR;
}

export type UserHomePageAction =
  | FetchHighlightedEventsAction
  | FetchHighlightedEventsRequestAction
  | FetchHighlightedEventsSuccessAction
  | FetchHighlightedEventsErrorAction;
