import { UserHomePageActionTypes, UserHomePageAction } from "../types/UserHomePageActionTypes";

export interface HighlightedEvent {
  id: number;
  title: string;
  description: string;
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  location: string;
  picture: string;
}

export interface UserHomePageState {
  highlightedEvents: HighlightedEvent[];
  isLoading: boolean;
  isError: boolean;
}

const initialCarouselState: UserHomePageState = {
  highlightedEvents: [],
  isLoading: true,
  isError: false,
};

export const UserHomePageReducer = (
  state: UserHomePageState = initialCarouselState,
  action: UserHomePageAction
): UserHomePageState => {
  switch (action.type) {
    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS:
      return {
        ...state,
        highlightedEvents: action.events,
        isLoading: false,
      };

    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
