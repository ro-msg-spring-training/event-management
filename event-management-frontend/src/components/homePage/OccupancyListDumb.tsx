import React from "react";
import { ListItem, Typography, Divider, Avatar, Box } from "@material-ui/core";
import { OccupancyCardType } from "../../types/OcuupancyCardsType";
import useStylesCards from "../../styles/OccupancyCardsStyle";
import DateRangeIcon from "@material-ui/icons/DateRange";

interface Props {
  eventsList: OccupancyCardType[];
}
const OccupancyListDumb = (props: Props) => {
  const classCardStyle = useStylesCards();
  return (
    <div className={classCardStyle.list}>
      {console.log(props.eventsList)}
      {props.eventsList.map((event: any) => (
        <div className={classCardStyle.block}>
          <Box component="div" display="inline">
            <Avatar className={classCardStyle.avatar}>{event.title.charAt(0).toUpperCase()}</Avatar>
          </Box>
          <Box component="div" display="inline">
            <ListItem className={classCardStyle.listItem}>
              <Typography className={classCardStyle.title}>{event.title}</Typography>
              <Typography className={classCardStyle.occupancyRate}>Occupancy Rate: {event.occupancyRate} %</Typography>
              <Typography className={classCardStyle.dateRange}>
                <DateRangeIcon className={classCardStyle.dateIcon}></DateRangeIcon>
                {event.startDate} <p className={classCardStyle.dateText}>to</p>{" "}
                <p className={classCardStyle.dateEnd}>{event.endDate}</p>
              </Typography>
            </ListItem>
          </Box>
          <div className={classCardStyle.event}></div>
          <Divider variant={"middle"} />
        </div>
      ))}
    </div>
  );
};

export default OccupancyListDumb;
