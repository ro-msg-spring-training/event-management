import {
  FETCH_TICKETS,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_ERROR,
  INCREMENT_PAGE,
  UPDATE_FILTERS_TICKETS,
  RESET_FILTERS_TICKETS,
  RESET_PAGE_TICKETS,
} from '../actions/TicketsPageActions';
import { TicketFilters } from '../model/TicketFilters';

export interface TicketsPageState {
  allTickets: [];
  filters: TicketFilters;
  open: boolean;
  page: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: TicketsPageState = {
  allTickets: [],
  filters: {
    title: '',
    startDate: undefined,
    endDate: undefined,
  },
  open: false,
  page: 1,
  isLoading: true,
  isError: false,
};

interface ReducerActionProps {
  type: string;
  payload: [];
}

export const TicketsPageReducer = (state = initialState, action: ReducerActionProps) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_TICKETS:
      return {
        ...state,
      };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        allTickets: action.payload,
      };
    case FETCH_TICKETS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case UPDATE_FILTERS_TICKETS:
      return {
        ...state,
        filters: action.payload,
      };
    case RESET_FILTERS_TICKETS:
      return {
        ...state,
        filters: {
          title: '',
          date: undefined,
        },
      };
    case RESET_PAGE_TICKETS:
      return {
        ...state,
        page: 1,
      };
    default:
      return state;
  }
};
