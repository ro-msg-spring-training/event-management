import { LocationType } from "../types/LocationType";
import {
  LocationAction,
  LocationActionTypes,
} from "../actions/LocationActions";

export interface LocationPageState {
  locations: LocationType[];
  isLoading: boolean;
  error: string;
}

const initialState: LocationPageState = {
  isLoading: true,
  locations: [],
  error: "",
};

export const LocationPageReducer = (
  state: LocationPageState = initialState,
  action: LocationAction
): LocationPageState => {
  switch (action.type) {
    case LocationActionTypes.LOCATION_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case LocationActionTypes.LOCATION_FETCH_SUCCESS: {
      return {
        ...state,
        locations: action.locations,
      };
    }
    case LocationActionTypes.LOCATION_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    default:
      return state;
  }
};

export default LocationPageReducer;
