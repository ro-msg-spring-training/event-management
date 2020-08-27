import { EventWithLocation } from "../model/EventWithLocation"

export const LOAD_EVENT_WITH_LOCATIONS = 'LOAD_EVENT_WITH_LOCATIONS'
export const FETCH_EVENT_WITH_LOCATION_REQUEST = 'FETCH_EVENT_WITH_LOCATION_REQUEST'
export const FETCH_EVENT_WITH_LOCATION_SUCCESS = 'FETCH_EVENT_WITH_LOCATION_SUCCESS'
export const FETCH_EVENT_WITH_LOCATION_FAILURE = 'FETCH_EVENT_WITH_LOCATION_FAILURE'

//-------------------------------------------------------------for SAGA
export const loadEventWithLocations = (id: string) => {
  return {
    type: LOAD_EVENT_WITH_LOCATIONS,
    payload: id
  }
}

//-------------------------------------------------------------
export const fetchEventWithLocationRequest = () => {
  return {
    type: FETCH_EVENT_WITH_LOCATION_REQUEST
  }
}

export const fetchEventWithLocationSuccess = (event: EventWithLocation) => {
  return {
    type: FETCH_EVENT_WITH_LOCATION_SUCCESS,
    payload: event
  }
}

export const fetchEventWithLocationFailure = (error: string) => {
  return {
    type: FETCH_EVENT_WITH_LOCATION_FAILURE,
    payload: error
  }
}

