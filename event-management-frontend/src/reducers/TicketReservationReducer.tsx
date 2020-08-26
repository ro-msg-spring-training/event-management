
import {
  FETCH_TICKET_CATEGORIES_REQUEST,
  FETCH_TICKET_CATEGORIES_SUCCESS,
  FETCH_TICKET_CATEGORIES_FAILURE
} from "../actions/TicketReservationActions"
import { TicketAvailabilityData } from "../model/TicketAvailabilityData"

export interface EventState {
  ticketCategory: TicketAvailabilityData[],
  isError: boolean,
  isLoading: boolean,
}

const initialState: EventState = {
  ticketCategory: [{
    title: "",
    remaining: 0,
    sold: 0,
  }],
  isError: false,
  isLoading: false,
}

const TicketCategoriesReducer = (state = initialState, action: { type: string, payload: TicketAvailabilityData[] }) => {
  switch (action.type) {
    case FETCH_TICKET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        isLoading: true
      }
    case FETCH_TICKET_CATEGORIES_SUCCESS:
      return {
        ...state,
        ticketCategory: action.payload,
        isError: false,
        isLoading: false,
      }
    case FETCH_TICKET_CATEGORIES_FAILURE:
      return {
        ...state,
        ticketCategory: action.payload,
        isError: true,
        isLoading: false
      }
    default: return state
  }
}

export default TicketCategoriesReducer