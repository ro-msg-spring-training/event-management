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
  ADD_EMPTY_CATEGORY_CARD,
  REMOVE_CATEGORY_CARD,
} from "../actions/HeaderEventCrudActions";
import { EventCrud } from "../model/EventCrud";
import { EventImage } from "../model/EventImage";
import { EventFormErrors, CategoryCardErrors } from "../model/EventFormErrors";
import { CategoryCardItem } from "../types/TicketType";
import { TicketAvailabilityData } from "../model/TicketAvailabilityData";

export interface EventState {
  loading: boolean;
  event: EventCrud;
  ticketData: TicketAvailabilityData[];
  error: string;
  isError: boolean;
  isLoading: boolean;
  images: EventImage[];
  formErrors: EventFormErrors;
  locationAddress: string;
  locationName: string;
  isDeleted: boolean;
  isSaved: boolean;
}

let today = new Date(new Date().toString().split("GMT")[0] + " UTC").toISOString().split(".")[0];
const dateAndTime = today.split("T");
const currDate = dateAndTime[0];
const currTime = dateAndTime[1].replace(/:\d\d([ ap]|$)/, "$1");

export const noCardError: CategoryCardErrors = {
  title: "",
  subtitle: "",
  price: "",
  description: "",
  ticketsPerCategory: "",
};

export const emptyCard: CategoryCardItem = {
  id: -1,
  title: "",
  subtitle: "",
  price: 0,
  description: "",
  ticketsPerCategory: 0,
  available: true,
};

export const newTicket: TicketAvailabilityData = {
  title: "",
  remaining: -1,
  sold: 0,
};

export const initialState: EventState = {
  loading: false,
  event: {
    id: -1,
    title: "",
    subtitle: "",
    status: true,
    highlighted: false,
    description: "",
    observations: "",
    location: -1,
    startDate: currDate,
    endDate: currDate,
    startHour: currTime,
    endHour: currTime,
    maxPeople: 0,
    picturesUrlSave: [],
    picturesUrlDelete: [],
    ticketsPerUser: 0,
    noTicketEvent: true,
    ticketCategoryDtoList: [emptyCard],
    ticketCategoryToDelete: [],
    ticketInfo: "",
  },
  ticketData: [newTicket],
  formErrors: {
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxPeople: "",
    ticketsPerUser: "",
    ticketInfo: "",
    ticketCategoryDtoList: [noCardError],
  },
  error: "",
  isError: false,
  isLoading: false,
  images: [],

  locationAddress: "",
  locationName: "",

  isDeleted: false,
  isSaved: false
};

const getEventImages = (imagesStr: string[]) => {
  const images = imagesStr.map((img: string) => {
    let fullName = img.split("/").pop();
    return { id: fullName, name: fullName, url: img };
  });
  return images as EventImage[];
};

const HeaderReducer = (
  state = initialState,
  action: { type: string; payload: EventCrud; id: number; ticketCategoryData: TicketAvailabilityData[] }
) => {
  switch (action.type) {
    case RESET_STORE:
      return initialState;
    case UPDATE_LOCATION:
      const newEvent = JSON.parse(JSON.stringify(state.event));
      newEvent.location = action.payload;
      return {
        ...state,
        event: newEvent,
      };

    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        isLoading: true,
      };

    case FETCH_EVENT_SUCCESS:
      let ticketCategoryErrors: CategoryCardErrors[] = [];
      let TCElenght = action.payload.ticketCategoryDtoList.length;
      for (var i = 0; i < TCElenght; i++) {
        ticketCategoryErrors.push({ title: "", subtitle: "", price: "", description: "", ticketsPerCategory: "" });
      }
      return {
        ...state,
        loading: false,
        event: action.payload,
        ticketData: action.ticketCategoryData,
        error: "",
        isError: false,
        isLoading: false,
        images: getEventImages(action.payload.picturesUrlSave),
        formErrors: {
          ...state.formErrors,
          ticketCategoryDtoList: ticketCategoryErrors,
        },
      };

    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        event: action.payload,
        isError: true,
        isLoading: false,
      };

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        ...initialState,
        isDeleted: true
      };

    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSaved: true
      };

    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        newProduct: action.payload,
      };

    case EDIT_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSaved: true
      };

    case EDIT_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        newProduct: action.payload,
      };

    case UPDATE_EVENT_IMAGES:
      return {
        ...state,
        images: action.payload,
        isError: false,
      };

    case UPDATE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };

    case UPDATE_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case ADD_EMPTY_CATEGORY_CARD:
      let nextId = state.event.ticketCategoryDtoList[state.event.ticketCategoryDtoList.length - 1]
        ? Math.abs(state.event.ticketCategoryDtoList[state.event.ticketCategoryDtoList.length - 1].id) + 1
        : 1;
      nextId *= -1;
      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: [
            ...state.event.ticketCategoryDtoList,
            {
              id: nextId,
              title: "",
              subtitle: "",
              price: 0,
              description: "",
              ticketsPerCategory: 0,
              available: true,
            },
          ],
        },
        formErrors: {
          ...state.formErrors,
          ticketCategoryDtoList: [
            ...state.formErrors.ticketCategoryDtoList,
            { title: "", subtitle: "", price: "", description: "", ticketsPerCategory: "" },
          ],
        },
      };

    case REMOVE_CATEGORY_CARD: {
      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: state.event.ticketCategoryDtoList.filter((data) => data.id !== action.id),
          ticketCategoryToDelete: [...state.event.ticketCategoryToDelete, action.id],
        },
      };
    }
    default:
      return state;
  }
};

export default HeaderReducer;
