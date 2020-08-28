
import {
  FETCH_TICKET_CATEGORIES_REQUEST,
  FETCH_TICKET_CATEGORIES_SUCCESS,
  FETCH_TICKET_CATEGORIES_FAILURE,
  ADD_BOOKINGS_REQUEST,
  ADD_BOOKINGS_SUCCESS,
  ADD_BOOKINGS_FAILURE,

} from "../actions/TicketReservationActions"
import { TicketAvailabilityData } from "../model/TicketAvailabilityData"
import Booking from "../model/Booking"

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

const TicketCategoriesReducer = (state = initialState, action: { type: string, payload: TicketAvailabilityData[] | Booking}) => {
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
        ticketCategory: action.payload as TicketAvailabilityData[],
        isError: false,
        isLoading: false,
      }
    case FETCH_TICKET_CATEGORIES_FAILURE:
      return {
        ...state,
        ticketCategory: action.payload as TicketAvailabilityData[],
        isError: true,
        isLoading: false
      }
    case ADD_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_BOOKINGS_SUCCESS:
      console.log("SUCCESS");
      return {
        ...state,
        loading: false,
      }
    case ADD_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        newProduct: action.payload as Booking
      }
    default: return state
  }
}

export default TicketCategoriesReducer