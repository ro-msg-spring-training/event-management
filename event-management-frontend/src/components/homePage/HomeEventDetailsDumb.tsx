import React from "react";
import { Event } from "../../model/Event";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import useStylesCards from "../../styles/OccupancyCardsStyle";
import {useStylesEventsHome} from "../../styles/EventsHomeStyle";


interface Props {
  events: Event;
}

const HomeEventDetailsDumb = (props: Props) => {
  const classes = useStylesEventsHome();
  const occupancyClasses = useStylesCards();
  const id = props.events.id;
  const title = props.events.title;
  const location = props.events.location;
  const startDate = props.events.startDate;
  const endDate = props.events.endDate;

  return (
    <Link to={`/admin/events/${id}`} style={{ textDecoration: "none" }}>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.eventCard}>
          <Typography className={`${classes.title} ${occupancyClasses.text}`}>{title}</Typography>

          {startDate === endDate ? (
            <Typography className={`${classes.date} ${occupancyClasses.text}`}>
              <DateRangeIcon className={occupancyClasses.dateIcon} /> {startDate}
            </Typography>
          ) : (
            <Typography className={`${classes.date} ${occupancyClasses.text}`}>
              <DateRangeIcon className={occupancyClasses.dateIcon} /> {startDate} - {endDate}
            </Typography>
          )}

          <Typography className={`${classes.location} ${occupancyClasses.text}`}>
            <LocationOnIcon className={occupancyClasses.icon} fontSize={"small"} /> {location}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};


export default HomeEventDetailsDumb;
