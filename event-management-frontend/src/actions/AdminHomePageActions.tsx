import {
  AdminHomePageActionTypes,
  UpcomingEventsLoadingStatusAction,
  UpcomingEventsErrorAction,
  UpcomingEventsFetchSuccessAction,
  UpcomingEventsFetchAction,
  HistoryEventsErrorAction,
  HistoryEventsLoadingStatusAction,
  HistoryEventsFetchSuccessAction,
  HistoryEventsFetchAction,
} from '../types/AdminHomePageActionTypes';
import { OccupancyCardType } from '../model/OcuupancyCardsType';

export const upcomingEventsisLoading = (loadingStatus: boolean): UpcomingEventsLoadingStatusAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const upcomingEventsError = (errorStatus: boolean): UpcomingEventsErrorAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_ERROR,
    errorStatus: errorStatus,
  };
};

export const upcomingEventsFetchSucces = (upcomingEvents: OccupancyCardType[]): UpcomingEventsFetchSuccessAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH_SUCCESS,
    upcomingEvents: upcomingEvents,
  };
};

export const upcomingEventsFetch = (): UpcomingEventsFetchAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH,
  };
};

export const historyEventsisLoading = (loadingStatus: boolean): HistoryEventsLoadingStatusAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const historyEventsError = (errorStatus: boolean): HistoryEventsErrorAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_ERROR,
    errorStatus: errorStatus,
  };
};

export const historyEventsFetchSucces = (historyEvents: OccupancyCardType[]): HistoryEventsFetchSuccessAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_FETCH_SUCCESS,
    historyEvents: historyEvents,
  };
};

export const historyEventsFetch = (): HistoryEventsFetchAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_FETCH,
  };
};
