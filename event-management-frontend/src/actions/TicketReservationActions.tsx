import { TicketAvailabilityData } from "../model/TicketAvailabilityData"
import Booking from "../model/Booking"

export const LOAD_TICKET_CATEGORIES = 'LOAD_TICKET_CATEGORIES'
export const ADD_BOOKINGS = 'ADD_BOOKINGS'

export const FETCH_TICKET_CATEGORIES_REQUEST = 'FETCH_TICKET_CATEGORIES_REQUEST'
export const FETCH_TICKET_CATEGORIES_SUCCESS = 'FETCH_TICKET_CATEGORIES_SUCCESS'
export const FETCH_TICKET_CATEGORIES_FAILURE = 'FETCH_TICKET_CATEGORIES_FAILURE'

export const ADD_BOOKINGS_REQUEST = 'ADD_BOOKINGS_REQUEST'
export const ADD_BOOKINGS_SUCCESS = 'ADD_BOOKINGS_SUCCESS'
export const ADD_BOOKINGS_FAILURE = 'ADD_BOOKINGS_FAILURE'

//---------------------------------------------------for SAGA
export const loadTicketCategories = (idEvent: string) => {
  return {
    type: LOAD_TICKET_CATEGORIES,
    payload: idEvent
  }
}

export const addBookings = (booking: Booking) => {
  return {
    type: ADD_BOOKINGS,
    payload: {bookings: booking}
  }
}

//------------------------------------------------------ FETCH
 
export const fetchTicketCategoriesRequest = () => {
  return {
    type: FETCH_TICKET_CATEGORIES_REQUEST
  }
}

export const fetchTicketCategoriesSuccess = (ticketCategories: TicketAvailabilityData[]) => {
  return {
    type: FETCH_TICKET_CATEGORIES_SUCCESS,
    payload: ticketCategories
  }
}

export const fetchTicketCategoriesFailure = (error: string) => {
  return {
    type: FETCH_TICKET_CATEGORIES_FAILURE,
    payload: error
  }
}

//---------------------------------------------------------- POST

export const addBookingsRequest = () => {
  return {
    type: ADD_BOOKINGS_REQUEST,
  }
}

export const addBookingsSuccess = () => {
  return {
    type: ADD_BOOKINGS_SUCCESS,
  }
}

export const addBookingsFailure = (error: string) => {
  return {
    type: ADD_BOOKINGS_FAILURE,
    payload: error
  }
}