import { EventCrud } from "../model/EventCrud"

export const LOAD_EVENT = 'LOAD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const ADD_EVENT = 'ADD_EVENT'

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST'
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS'
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE'

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST'
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS'
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE'

export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST'
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS'
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE'

//---------------------------------------------------for SAGA
export const loadEvent = (id: string) => {
  return {
    type: LOAD_EVENT,
    payload: id
  }
}

export const deleteEvent = (id: string) => {
  return {
    type: DELETE_EVENT,
    payload: id
  }
}

export const addEvent = (event: EventCrud) => {
  return {
    type: ADD_EVENT,
    payload: event
  }
}
//------------------------------------------------------

export const fetchEventRequest = () => {
  return {
    type: FETCH_EVENT_REQUEST
  }
}

export const fetchEventSuccess = (product: EventCrud) => {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: product
  }
}

export const fetchEventFailure = (error: string) => {
  return {
    type: FETCH_EVENT_FAILURE,
    payload: error
  }
}

export const deleteEventRequest = () => {
  return {
    type: DELETE_EVENT_REQUEST
  }
}

export const deleteEventSuccess = () => {
  return {
    type: DELETE_EVENT_SUCCESS,
  }
}

export const deleteEventFailure = (error: string) => {
  return {
    type: DELETE_EVENT_FAILURE,
    payload: error
  }
}

export const addEventRequest = () => {
  return {
    type: ADD_EVENT_REQUEST,
  }
}

export const addEventSuccess = () => {
  return {
    type: ADD_EVENT_SUCCESS,
  }
}

export const addEventFailure = (error: string) => {
  return {
    type: ADD_EVENT_FAILURE,
    payload: error
  }
}