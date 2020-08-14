import { FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS, FETCH_EVENT_FAILURE, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE, ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE } from "../actions/HeaderEventCrudActions"
import { EventCrud } from "../model/EventCrud"

export interface EventState {
  loading: boolean,
  event: EventCrud,
  error: string
}

const initialState: EventState = {
  loading: false,
  event: {
    id: -1, title: "NEW EVENT", subtitle: "mock", status: "active", highlighted: false, description: "mock",
    observations: "mock", location: "mock", startDate: "2019-08-03", endDate: "2019-08-03", startTime: "07:12", endTime: "07:12",
    maxPeople: 0, images: [""], maxNoTicketsPerUser: 0
  },
  error: ''
}

const HeaderReducer = (state = initialState, action: { type: string, payload: EventCrud }) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_EVENT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: ''
      }
    case FETCH_EVENT_FAILURE:
      return {
        loading: false,
        product: action.payload
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
    default: return state
  }
}

export default HeaderReducer