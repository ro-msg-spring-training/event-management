import { EventReserveTicketType } from "../types/EventReserveTicketType";
import { ReserveTicketAction, ReserveTicketActionTypes } from "../actions/ReserveTicketsActions";

export interface ReserveFirstPageState {
  event: EventReserveTicketType;
  isLoading: boolean;
  error: string;
}

const initialState: ReserveFirstPageState = {
  isLoading: true,
  event: {
    id: 0,
    title: "",
    subtitle: "",
    locationAddress: "",
    locationName: "",
    startDate: "",
    endDate: "",
    startHour: "",
    endHour: "",
    ticketInfo: "",
  },
  error: "",
};

export const ReservePageReducer = (
  state: ReserveFirstPageState = initialState,
  action: ReserveTicketAction
): ReserveFirstPageState => {
  switch (action.type) {
    case ReserveTicketActionTypes.RESERVE_EVENT_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case ReserveTicketActionTypes.RESERVE_EVENT_FETCH_SUCCESS: {
      return {
        ...state,
        event: action.event,
      };
    }
    case ReserveTicketActionTypes.RESERVE_EVENT_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    default:
      return state;
  }
};

export default ReservePageReducer;
