import React from "react";
import { ListItem, Typography, Divider, Avatar, Box } from "@material-ui/core";
import { OccupancyCardType } from "../../types/OcuupancyCardsType";
import useStylesCards from "../../styles/OccupancyCardsStyle";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useTranslation } from "react-i18next";

interface Props {
  eventsList: OccupancyCardType[];
}
const OccupancyListDumb = (props: Props) => {
  const classCardStyle = useStylesCards();
  const { t } = useTranslation();
  return (
    <div className={classCardStyle.list}>
      {props.eventsList.map((event: any) => (
        <div className={classCardStyle.block} key={event.id}>
          <Box component="div" display="inline">
            <Avatar className={classCardStyle.avatar}>{event.title.charAt(0).toUpperCase()}</Avatar>
          </Box>

          <Box component="div" display="inline">
            <ListItem className={classCardStyle.listItem}>
              <Typography className={classCardStyle.title}>{event.title}</Typography>
              <Typography className={classCardStyle.occupancyRate}>
                {t("occupancyCards.occupancyRate")} {event.occupancyRate} %
              </Typography>

              <Typography component={"div"} className={classCardStyle.dateRange}>
                <DateRangeIcon className={classCardStyle.dateIcon}></DateRangeIcon>
                {event.startDate} <p className={classCardStyle.dateText}>{t("occupancyCards.toDateText")}</p>
                <p className={classCardStyle.dateEnd}>{event.endDate}</p>
              </Typography>
            </ListItem>
          </Box>

          <Divider variant={"middle"} />
        </div>
      ))}
    </div>
  );
};

export default OccupancyListDumb;
