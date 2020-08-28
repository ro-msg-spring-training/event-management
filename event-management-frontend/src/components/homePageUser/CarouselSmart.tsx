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
import { CircularProgress, Container } from "@material-ui/core";
import classes from "*.module.css";
import { useStylesCarousel } from "../../styles/CarouselSlideStyle";

type Props = {
  isError: boolean;
  isLoading: boolean;
  events: HighlightedEvent[];
  fetchHighlightedEvents: () => void;
};

const CarouselSmart = ({ events, isError, isLoading, fetchHighlightedEvents }: Props) => {
  const history = useHistory();
  const [t] = useTranslation();
  const classes = useStylesCarousel();

  useEffect(() => {
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
        <CarouselDumb events={events} isLoading={isLoading} goToEventDetails={goToEventDetails} />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  events: state.userHome.highlightedEvents,
  isError: state.userHome.isError,
  isLoading: state.userHome.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchHighlightedEvents: () => dispatch(fetchHighlightedEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSmart);
