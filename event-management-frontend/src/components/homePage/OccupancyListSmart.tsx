import React, { useEffect } from "react";
import { OccupancyCardType } from "../../types/OcuupancyCardsType";
import { AppState } from "../../store/store";
import { Dispatch } from "redux";
import {
  upcomingEventsFetch,
  historyEventsFetch,
  upcomingEventsFetchSucces,
  historyEventsFetchSucces,
  upcomingEventsisLoading,
  historyEventsisLoading,
} from "../../actions/AdminHomePageActions";
import { connect } from "react-redux";
import CardsOccupancyDumb from "./CardsOcuppancyDumb";

interface Props {
  isLoading: boolean;
  isError: string;
  upcomingEvents: OccupancyCardType[];
  upcomingEventsisLoading: (loadingStatus: boolean) => void;
  upcomingEventsFetchSucces: (upcomnEvents: OccupancyCardType[]) => void;
  upcomingEventsFetch: () => void;
  historyEvents: OccupancyCardType[];
  historyEventsisLoading: (loadingStatus: boolean) => void;
  historyEventsFetchSucces: (historyEvents: OccupancyCardType[]) => void;
  historyEventsFetch: () => void;
}
const OccupancyListSmart: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.upcomingEventsFetch();
    props.historyEventsFetch();
    //props.upcomingEventsisLoading(false);
    //props.historyEventsisLoading(false);
  }, []);
  return (
    <CardsOccupancyDumb
      upcomingEvents={props.upcomingEvents}
      historyEvents={props.historyEvents}
      isLoading={props.isLoading}
      isError={props.isError}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  upcomingEvents: state.adminHomeCard.upcomingEvents,
  historyEvents: state.adminHomeCard.historyEvents,
  isLoading: state.adminHomeCard.isLoading,
  isError: state.adminHomeCard.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  upcomingEventsFetch: () => dispatch(upcomingEventsFetch()),
  historyEventsFetch: () => dispatch(historyEventsFetch()),
  upcomingEventsFetchSucces: (upcomingEvents: OccupancyCardType[]) =>
    dispatch(upcomingEventsFetchSucces(upcomingEvents)),
  historyEventsFetchSucces: (historyEvents: OccupancyCardType[]) => dispatch(historyEventsFetchSucces(historyEvents)),
  upcomingEventsisLoading: (loadingStatus: boolean) => dispatch(upcomingEventsisLoading(loadingStatus)),
  historyEventsisLoading: (loadingStatus: boolean) => dispatch(historyEventsisLoading(loadingStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OccupancyListSmart);
