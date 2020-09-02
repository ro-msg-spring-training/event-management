import {
  UPDATE_FILTERS,
  FILTER_EVENTS_SUCCESS,
  FILTER_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_REQUEST,
  FETCH_HOME_EVENTS_SUCCESS,
  FETCH_HOME_EVENTS_ERROR,
  FETCH_HOME_EVENTS_REQUEST,
  FILTER_EVENTS,
  UPDATE_SORT_CRITERIA,
  FETCH_CUSTOM_EVENTS_REQUEST,
  FETCH_CUSTOM_EVENTS_SUCCESS,
  FETCH_CUSTOM_EVENTS_ERROR,
  FETCH_CUSTOM_EVENTS_HOME,
  FETCH_CUSTOM_EVENTS_REQUEST_HOME,
  FETCH_CUSTOM_EVENTS_SUCCESS_HOME,
  FETCH_CUSTOM_EVENTS_ERROR_HOME,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  INCREMENT_PAGE_HOME,
  DECREMENT_PAGE_HOME,
  RESET_PAGE,
  RESET_PAGE_HOME,
  RESET_FILTERS,
  UPDATE_ERROR_RATE,
  UPDATE_ERROR_MAX_PEOPLE,
  UPDATE_ERROR_START_DATE,
  UPDATE_ERROR_END_DATE,
  UPDATE_ERROR_START_HOUR,
  UPDATE_ERROR_END_HOUR,
} from "../actions/EventsPageActions";
import { MathRelation } from "../model/MathRelation";
import { EventFilters } from "../model/EventFilters";
import { EventSort } from "../model/EventSort";


export interface EventsPageState {
  filters: EventFilters;
  errors: {
    errorRate: string,
    errorMaxPeople: string,
    errorStartDate: string,
    errorEndDate: string,
    errorStartHour: string,
    errorEndHour: string
  },
  allEvents: [];
  allEventsHome: [];
  isLoading: boolean;
  isError: boolean;
  isLoadingHome: boolean;
  isErrorHome: boolean;
  eventsSort: EventSort;
  page: number;
  homePage: number;
}

const initialState: EventsPageState = {
  filters: {
    title: "",
    subtitle: "",
    status: "none",
    highlighted: undefined,
    location: "",
    startDate: undefined,
    endDate: undefined,
    startHour: undefined,
    endHour: undefined,
    rate: "",
    rateSign: MathRelation.GREATER,
    maxPeople: "",
    maxPeopleSign: MathRelation.GREATER,
  },
  errors: {
    errorRate: '',
    errorMaxPeople: '',
    errorStartDate: '',
    errorEndDate: '',
    errorStartHour: '',
    errorEndHour: ''
  },
  isLoading: true,
  isError: false,
  isLoadingHome: true,
  isErrorHome: false,
  allEvents: [],
  allEventsHome: [],
  eventsSort: { criteria: "", type: "" },
  page: 0,
  homePage: 1,
};

interface ReducerActionProps {
  type: string;
  payload: any;
  sort: any;
  page: number;
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
  switch (action.type) {
    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case DECREMENT_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case INCREMENT_PAGE_HOME:
      return {
        ...state,
        homePage: state.homePage + 1,
      };
    case DECREMENT_PAGE_HOME:
      return {
        ...state,
        homePage: state.homePage - 1,
      };
    case RESET_PAGE:
      return {
        ...state,
        page: 0,
      };
    case RESET_PAGE_HOME:
      return {
        ...state,
        homePage: 1,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          title: "",
          subtitle: "",
          status: "none",
          highlighted: undefined,
          location: "",
          startDate: undefined,
          endDate: undefined,
          startHour: undefined,
          endHour: undefined,
          rate: "",
          rateSign: MathRelation.GREATER,
          maxPeople: "",
          maxPeopleSign: MathRelation.GREATER,
        },
        page: 0,
        eventsSort: { criteria: "", type: "" },
        allEvents: [],
        isLoading: false,
        isError: false,
      };
    case UPDATE_SORT_CRITERIA:
      return {
        ...state,
        eventsSort: action.payload,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case FILTER_EVENTS:
      return {
        ...state,
        eventsSort: { criteria: "", type: "" },
      };
    case FILTER_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload,
      };
    case FILTER_EVENTS_ERROR:
      return {
        ...state,
      };
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case FETCH_CUSTOM_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CUSTOM_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        allEvents: action.payload,
      };
    case FETCH_CUSTOM_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case FETCH_HOME_EVENTS_REQUEST:
      return {
        ...state,
        isLoadingHome: true,
      };
    case FETCH_HOME_EVENTS_SUCCESS:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: false,
        allEventsHome: action.payload,
      };
    case FETCH_HOME_EVENTS_ERROR:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: true,
      };
    case FETCH_CUSTOM_EVENTS_REQUEST_HOME:
      return {
        ...state,
        isLoadingHome: true,
        isErrorHome: false,
      };
    case FETCH_CUSTOM_EVENTS_HOME:
      return {
        ...state,
      };
    case FETCH_CUSTOM_EVENTS_SUCCESS_HOME:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: false,
        allEventsHome: action.payload,
      };
    case FETCH_CUSTOM_EVENTS_ERROR_HOME:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: true,
      };
    case UPDATE_ERROR_RATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorRate: action.payload
        }
      };
    case UPDATE_ERROR_MAX_PEOPLE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorMaxPeople: action.payload
        }
      };
    case UPDATE_ERROR_START_DATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorStartDate: action.payload
        }
      };
    case UPDATE_ERROR_END_DATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorEndDate: action.payload
        }
      };
    case UPDATE_ERROR_START_HOUR:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorStartHour: action.payload
        }
      };
    case UPDATE_ERROR_END_HOUR:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorEndHour: action.payload
        }
      };
    default:
      return state;
  }
};
