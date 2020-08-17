import { LocationType } from "../types/LocationType";
import locationUrl from "../api/LocationUrl";

export enum LocationActionTypes {
  LOCATION_FETCH = "LOCATION_FETCH",
  LOCATION_LOADING = "LOCATION_LOADING",
  LOCATION_FETCH_SUCCESS = "LOCATION_FETCH_SUCCESS",
  LOCATION_ERROR = "LOCATION_ERROR",
}

export class LocationFetchAction {
  public readonly type = LocationActionTypes.LOCATION_FETCH;
}
export class LocationLoadingStatusAction {
  public readonly type = LocationActionTypes.LOCATION_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class LocationErrorAction {
  public readonly type = LocationActionTypes.LOCATION_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
}

export class LocationFetchSuccessAction {
  public readonly type = LocationActionTypes.LOCATION_FETCH_SUCCESS;
  public locations: LocationType[];

  constructor(locations: LocationType[]) {
    this.locations = locations;
  }
}

export type LocationAction =
  | LocationFetchAction
  | LocationLoadingStatusAction
  | LocationErrorAction
  | LocationFetchSuccessAction;

export const locationisLoading = (
  loadingStatus: boolean
): LocationLoadingStatusAction => {
  return {
    type: LocationActionTypes.LOCATION_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const locationError = (errorStatus: string): LocationErrorAction => {
  return {
    type: LocationActionTypes.LOCATION_ERROR,
    errorStatus: errorStatus,
  };
};

export const locationFetchSucces = (
  locations: LocationType[]
): LocationFetchSuccessAction => {
  return {
    type: LocationActionTypes.LOCATION_FETCH_SUCCESS,
    locations: locations,
  };
};

export const locationFetch = (): LocationFetchAction => {
  return {
    type: LocationActionTypes.LOCATION_FETCH,
  };
};

export function fetchLocation() {
  return fetch(locationUrl)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
