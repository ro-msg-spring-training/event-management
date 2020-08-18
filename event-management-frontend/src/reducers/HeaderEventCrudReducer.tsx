import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  UPDATE_EVENT_IMAGES
} from "../actions/HeaderEventCrudActions"
import { EventCrud } from "../model/EventCrud"
import { EventImage } from "../model/EventImage"

export interface EventState {
  loading: boolean,
  event: EventCrud,
  error: string,
  isError: boolean,
  isLoading: boolean,
  images: EventImage[]
}

const initialState: EventState = {
  loading: false,
  event: {
    id: -1, title: "NEW EVENT", subtitle: "mock", status: "active", highlighted: false, description: "mock",
    observations: "mock", location: "mock", startDate: "2019-08-03", endDate: "2019-08-03", startHour: "07:12", endHour: "07:12",
    maxPeople: 0, picturesUrlSave: [], picturesUrlDelete: [], maxNoTicketsPerUser: 0,
    noTicketEvent: true
  },
  error: '',
  isError: false,
  isLoading: false,
  images: []
}

const getEventImages = (imagesStr: string[]) => {
  return [] as EventImage[]
}

const HeaderReducer = (state = initialState, action: { type: string, payload: EventCrud }) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        isLoading: true
      }
    case FETCH_EVENT_SUCCESS:
      return {
        loading: false,
        event: action.payload,
        error: '',
        isError: false,
        isLoading: false,
        images: getEventImages(action.payload.picturesUrlSave)
      }
    case FETCH_EVENT_FAILURE:
      return {
        loading: false,
        event: action.payload,
        isError: true,
        isLoading: false
      }
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_EVENT_SUCCESS:
      return {
        ...initialState,
      }
    case DELETE_EVENT_FAILURE:
      return {
        error: action.payload
      }
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_EVENT_SUCCESS:
      return {
        loading: false,
      }
    case ADD_EVENT_FAILURE:
      return {
        loading: false,
        newProduct: action.payload
      }
    case EDIT_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EDIT_EVENT_SUCCESS:
      return {
        loading: false,
      }
    case EDIT_EVENT_FAILURE:
      return {
        loading: false,
        newProduct: action.payload
      }
    case UPDATE_EVENT_IMAGES:
      return {
        ...state,
        images: action.payload,
        isError: false,
      }
    default: return state
  }
}

export default HeaderReducer