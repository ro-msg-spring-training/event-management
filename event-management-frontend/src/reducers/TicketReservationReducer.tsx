
import {
  FETCH_TICKET_CATEGORIES_REQUEST,
  FETCH_TICKET_CATEGORIES_SUCCESS,
  FETCH_TICKET_CATEGORIES_FAILURE,
  ADD_BOOKINGS_REQUEST,
  ADD_BOOKINGS_SUCCESS,
  ADD_BOOKINGS_FAILURE,
  UPDATE_BOOKINGS,
  UPDATE_TICKET_AMOUNT,
  UPDATE_TICKET_NAME,
  UPDATE_CHECKED,
} from "../actions/TicketReservationActions"
import { TicketAvailabilityData } from "../model/TicketAvailabilityData"
import Booking from "../model/Booking"
import { TicketsPerCateory, TicketNames } from "../model/UserReserveTicket"

export interface EventState {
  ticketCategory: TicketAvailabilityData[],
  isError: boolean,
  isLoading: boolean,

  booking: Booking,
  ticketAmount: TicketsPerCateory[],
  ticketNames: TicketNames[],
  checked: boolean,
}

const initialBooking = {
  bookingDate: "",
  eventId: "",
  email: "",
  tickets: []
}

const initialState: EventState = {
  ticketCategory: [{
    title: "",
    remaining: 0,
    sold: 0,
  }],
  isError: false,
  isLoading: false,

  booking: initialBooking,
  ticketAmount: [],
  ticketNames: [],
  checked: false,
}

const TicketCategoriesReducer = (state = initialState, action: { type: string, payload: TicketAvailabilityData[] | Booking }) => {
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
        isLoading: true
      }
    case ADD_BOOKINGS_SUCCESS:
      console.log("SUCCESS");
      return {
        ...state,
        isLoading: false,
      }
    case ADD_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true
      }
    case UPDATE_BOOKINGS:
      return {
        ...state,
        booking: action.payload as Booking
      }
    case UPDATE_TICKET_AMOUNT:
      return {
        ...state,
        ticketAmount: action.payload
      }
    case UPDATE_TICKET_NAME:
      return {
        ...state,
        ticketNames: action.payload
      }
    case UPDATE_CHECKED:
      return {
        ...state,
        checked: action.payload
      }
    default: return state
  }
}

export default TicketCategoriesReducer