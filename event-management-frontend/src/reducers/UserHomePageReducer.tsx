import {
  FETCH_HIGHLIGHTED_EVENTS_REQUEST,
  FETCH_HIGHLIGHTED_EVENTS_SUCCESS,
  FETCH_HIGHLIGHTED_EVENTS_ERROR,
} from "../actions/UserHomePageActions";

export interface HighlightedEventList {
  id: number;
  title: string;
  description: string;
  startTime: string;
  startDate: string;
  location: string;
  picture: string;
}

export interface UserHomePageState {
  highlightedEvents: HighlightedEventList[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserHomePageState = {
  highlightedEvents: [],
  isLoading: true,
  isError: false,
};

interface ActionProps {
  type: string;
  payload: any;
}

export const UserHomePageReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case FETCH_HIGHLIGHTED_EVENTS_REQUEST:
      return {
        ...state,
      };

    case FETCH_HIGHLIGHTED_EVENTS_SUCCESS:
      return {
        ...state,
        highlightedEvents: action.payload,
        isLoading: false,
        isError: false,
      };

    case FETCH_HIGHLIGHTED_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
