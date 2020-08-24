import { OccupancyCardType } from "../types/OcuupancyCardsType";
import { AdminHomePageAction, AdminHomePageActionTypes } from "../actions/AdminHomePageActions";

export interface OccupancyCardsState {
  upcomingEvents: OccupancyCardType[];
  historyEvents: OccupancyCardType[];
  isLoading: boolean;
  error: string;
}

const initialStateOccupancyCards: OccupancyCardsState = {
  upcomingEvents: [],
  historyEvents: [],
  isLoading: true,
  error: "",
};

export const AdminHomePageReducer = (
  state: OccupancyCardsState = initialStateOccupancyCards,
  action: AdminHomePageAction
): OccupancyCardsState => {
  switch (action.type) {
    case AdminHomePageActionTypes.UPCOMING_EVENTS_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH_SUCCESS: {
      return {
        ...state,
        upcomingEvents: action.upcomingEvents,
        isLoading: false,
      };
    }
    case AdminHomePageActionTypes.UPCOMING_EVENTS_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_FETCH_SUCCESS: {
      return {
        ...state,
        historyEvents: action.historyEvents,
        isLoading: false,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }

    default:
      return state;
  }
};
