import { TicketAvailabilityData } from "../model/TicketAvailabilityData"

export const LOAD_TICKET_CATEGORIES = 'LOAD_TICKET_CATEGORIES'

export const FETCH_TICKET_CATEGORIES_REQUEST = 'FETCH_TICKET_CATEGORIES_REQUEST'
export const FETCH_TICKET_CATEGORIES_SUCCESS = 'FETCH_TICKET_CATEGORIES_SUCCESS'
export const FETCH_TICKET_CATEGORIES_FAILURE = 'FETCH_TICKET_CATEGORIES_FAILURE'

//---------------------------------------------------for SAGA
export const loadTicketCategories = (idEvent: string) => {
  return {
    type: LOAD_TICKET_CATEGORIES,
    payload: idEvent
  }
}

//------------------------------------------------------

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
