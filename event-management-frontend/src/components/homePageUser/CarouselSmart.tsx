import React, { useEffect } from "react";
import "../../styles/CarouselStyle.css";
import { useHistory } from "react-router-dom";
import CarouselDumb from "./CarouselDumb";
import { AppState } from "../../store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { fetchHighlightedEvents } from "../../actions/UserHomePageActions";
import { HighlightedEvent } from "../../reducers/UserHomePageReducer";
import { useTranslation } from "react-i18next";

type Props = {
  isError: boolean;
  events: HighlightedEvent[];
  fetchHighlightedEvents: () => void;
};

const CarouselSmart = ({ events, isError, fetchHighlightedEvents }: Props) => {
  const history = useHistory();
  const [t] = useTranslation();

  useEffect(() => {
    console.log("USEEFFECT");
    fetchHighlightedEvents();
  }, []);

  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  return (
    <>
      {isError ? (
        <p style={{ textAlign: "center" }}> {t("userHomePage.carousselError")} </p>
      ) : (
        <CarouselDumb events={events} goToEventDetails={goToEventDetails} />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  events: state.userHome.highlightedEvents,
  isError: state.userHome.isError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchHighlightedEvents: () => dispatch(fetchHighlightedEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSmart);
