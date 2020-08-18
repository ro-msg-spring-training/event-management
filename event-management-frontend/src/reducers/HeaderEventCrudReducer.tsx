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
  UPDATE_EVENT
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
  formErrors: EventFormErrors
}

const initialState: EventState = {
  loading: false,
  event: {
    id: -1, title: "NEW EVENT", subtitle: "mock", status: true, highlighted: false, description: "mock",
    observations: "mock", location: "mock", startDate: "2019-08-03", endDate: "2019-08-03", startHour: "07:12", endHour: "07:12",
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
  images: []
}

const getEventImages = (imagesStr: string[]) => {
  console.log('images str', imagesStr)
  const images = imagesStr.map((img: string) => {
    let fullName = img.split('/').pop();
    let name = fullName?.split('.')[0]
    return { id: name, name: name, url: img }
  })
  console.log('images obj', images)
  return images as EventImage[]
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
      console.log('in reducere ajunge...', action.payload)
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