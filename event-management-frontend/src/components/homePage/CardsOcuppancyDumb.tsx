import React from "react";
import { Card, CardContent, Typography, CircularProgress } from "@material-ui/core";
import OccupancyListDumb from "./OccupancyListDumb";
import { useStyles } from "../../styles/CommonStyles";
import useStylesCards from "../../styles/OccupancyCardsStyle";
import { OccupancyCardType } from "../../types/OcuupancyCardsType";
import "../../styles/OccupancyCards.css";
import ErrorIcon from "@material-ui/icons/Error";
interface Props {
  upcomingEvents: OccupancyCardType[];
  historyEvents: OccupancyCardType[];
  isError: string;
  isLoading: boolean;
}

const CardsOccupancyDumb = (props: Props) => {
  const commonClasses = useStyles();
  const occupancyClasses = useStylesCards();
  return (
    <div className={occupancyClasses.cardContainer}>
      <Card
        className={`${commonClasses.cardRoot} 
    ${occupancyClasses.occupancyCard} cardsResponsive`}
        variant="outlined"
      >
        <CardContent>
          <Typography className={occupancyClasses.cardTitle}>Upcoming Events</Typography>
          {props.isLoading ? (
            <CircularProgress />
          ) : props.isError ? (
            <div>
              <ErrorIcon color={"primary"} fontSize={"large"} />
              Oops, there was an error
            </div>
          ) : (
            <OccupancyListDumb eventsList={props.upcomingEvents} />
          )}
        </CardContent>
      </Card>
      <Card
        className={`${commonClasses.cardRoot} 
    ${occupancyClasses.occupancyCard} cardsResponsive`}
        variant="outlined"
      >
        <CardContent>
          <Typography className={occupancyClasses.cardTitle}>Last events</Typography>
          {props.isLoading ? (
            <CircularProgress />
          ) : props.isError ? (
            <div>
              <ErrorIcon color={"primary"} fontSize={"large"} />
              Oops, there was an error
            </div>
          ) : (
            <OccupancyListDumb eventsList={props.historyEvents} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsOccupancyDumb;
