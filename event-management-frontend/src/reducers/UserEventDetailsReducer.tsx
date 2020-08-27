import { EventCrud } from "../model/EventCrud"
import { EventImage } from "../model/EventImage"
import { EventWithLocation } from "../model/EventWithLocation"
import {
  FETCH_EVENT_WITH_LOCATION_REQUEST,
  FETCH_EVENT_WITH_LOCATION_SUCCESS,
  FETCH_EVENT_WITH_LOCATION_FAILURE
} from "../actions/UserEventDetailsActions"

export interface UserEventDetailsState {
  event: EventCrud,
  isError: boolean,
  isLoading: boolean,
  images: EventImage[],

  locationAddress: string,
  locationName: string,
}

let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
const dateAndTime = today.split("T");
const currDate = dateAndTime[0];
const currTime = dateAndTime[1].replace(/:\d\d([ ap]|$)/, '$1');


const initialState: UserEventDetailsState = {
  event: {
    id: -1, title: "", subtitle: "", status: true, highlighted: false, description: "",
    observations: "", location: 1, startDate: currDate, endDate: currDate, startHour: currTime, endHour: currTime,
    maxPeople: 0, picturesUrlSave: [], picturesUrlDelete: [], maxNoTicketsPerUser: 0,
    noTicketEvent: true
  },
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

const UserEventDetailsReducer = (state = initialState, action: { type: string, payload: EventWithLocation }) => {
  switch (action.type) {
    case FETCH_EVENT_WITH_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_EVENT_WITH_LOCATION_SUCCESS:
      return {
        ...state,
        event: action.payload.eventDto,
        locationAddress: action.payload.locationAddress,
        locationName: action.payload.locationName,
        isError: false,
        isLoading: false,
        images: getEventImages(action.payload.eventDto.picturesUrlSave)
      }
    case FETCH_EVENT_WITH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        isLoading: false
      }
    default: return state
  }
}

export default UserEventDetailsReducer