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
  UPDATE_EVENT_IMAGES,
  UPDATE_FORM_ERRORS,
  UPDATE_EVENT,
  UPDATE_LOCATION,
  RESET_STORE,
} from "../actions/HeaderEventCrudActions"
import { EventCrud } from "../model/EventCrud"
import { EventImage } from "../model/EventImage"
import { EventFormErrors } from "../model/EventFormErrors"

export interface EventState {
  loading: boolean,
  event: EventCrud,
  error: string,
  isError: boolean,
  isLoading: boolean,
  images: EventImage[],
  formErrors: EventFormErrors,

  locationAddress: string,
  locationName: string,
}

let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
const dateAndTime = today.split("T");
const currDate = dateAndTime[0];
const currTime = dateAndTime[1].replace(/:\d\d([ ap]|$)/, '$1');


const initialState: EventState = {
  loading: false,
  event: {
    id: -1, title: "", subtitle: "", status: true, highlighted: false, description: "",
    observations: "", location: 1, startDate: currDate, endDate: currDate, startHour: currTime, endHour: currTime,
    maxPeople: 0, picturesUrlSave: [], picturesUrlDelete: [], maxNoTicketsPerUser: 0,
    noTicketEvent: true
  },
  formErrors: {
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxPeople: "",
  },
  error: '',
  isError: false,
  isLoading: false,
  images: [],

  locationAddress: "",
  locationName: "",
}

const getEventImages = (imagesStr: string[]) => {
  const images = imagesStr.map((img: string) => {
    let fullName = img.split('/').pop();
    return { id: fullName, name: fullName, url: img }
  })
  return images as EventImage[]
}

const HeaderReducer = (state = initialState, action: { type: string, payload: EventCrud}) => {
  switch (action.type) {
    case RESET_STORE:
      return {
        ...initialState
      }
    case UPDATE_LOCATION:
      const newEvent = JSON.parse(JSON.stringify(state.event))
      newEvent.location = action.payload
      return {
        ...state,
        event: newEvent
      }
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        isLoading: true
      }
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload,
        error: '',
        isError: false,
        isLoading: false,
        images: getEventImages(action.payload.picturesUrlSave)
      }
    case FETCH_EVENT_FAILURE:
      return {
        ...state,
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
        ...state,
        ...initialState,
      }
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ADD_EVENT_FAILURE:
      return {
        ...state,
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
        ...state,
        loading: false,
      }
    case EDIT_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        newProduct: action.payload
      }
    case UPDATE_EVENT_IMAGES:
      return {
        ...state,
        images: action.payload,
        isError: false,
      }
    case UPDATE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      }
    case UPDATE_EVENT:
      return {
        ...state,
        event: action.payload
      }
    default: return state
  }
}

export default HeaderReducer