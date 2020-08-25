import React from "react";
import { EventReserveTicketType } from "../../../types/EventReserveTicketType";
import {
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import useStylesbuyTicketFirstPage from "../../../styles/BuyTicketsFirstPageStyle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import { Link } from "react-router-dom";
import { useStyles } from "../../../styles/CommonStyles";
import DateDisplayDumb from "../DateDisplayDumb";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

interface Props {
  event: EventReserveTicketType;
}
const BuyTicketFirstPageDumb = (props: Props) => {
  const reserveTicketFirstPage = useStylesbuyTicketFirstPage();
  const classes = useStyles();
  if (props.event.startDate !== props.event.endDate) {
    props.event.endDate = "";
  }
  return (
    <div className={reserveTicketFirstPage.pagecontainer}>
      <Paper className={reserveTicketFirstPage.paperStyle}>
        <h1 className={reserveTicketFirstPage.title}>{props.event.title}</h1>

        <div className={reserveTicketFirstPage.styleblock}>
          <LocationOnIcon className={reserveTicketFirstPage.iconStyleLocation} />
          <p className={reserveTicketFirstPage.styleInline}>
            <span className={reserveTicketFirstPage.locationName}>{props.event.locationName}</span>
            <Typography className={`${reserveTicketFirstPage.newLineSpan} ${classes.typography}`}>
              {props.event.locationAddress}
            </Typography>
          </p>
        </div>

        <p className={` ${reserveTicketFirstPage.textStyle}`}>
          <span className={reserveTicketFirstPage.align}>
            <DateRangeRoundedIcon className={reserveTicketFirstPage.iconStyle} />
          </span>
          <DateDisplayDumb startDate={props.event.startDate} endDate={props.event.endDate}></DateDisplayDumb>
        </p>
        <p className={` ${reserveTicketFirstPage.textStyle}`}>
          <ScheduleRoundedIcon className={reserveTicketFirstPage.iconStyle} />
          {props.event.startHour.replace(/:\d\d([ ap]|$)/, "$1")}

          <span className={reserveTicketFirstPage.spacing}>to</span>
          {props.event.endHour.replace(/:\d\d([ ap]|$)/, "$1")}
        </p>

        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          className={reserveTicketFirstPage.radioGroup}
        >
          <FormControlLabel
            className={reserveTicketFirstPage.textStyle}
            value="top"
            control={<Radio color="primary" />}
            label={<span className={reserveTicketFirstPage.textStyle}>Proceed without choosing a seat</span>}
            labelPlacement="start"
          />
          <FormControlLabel
            value="start"
            control={<Radio color="primary" />}
            label={<span className={reserveTicketFirstPage.textStyle}>Select a seat from building plan</span>}
            labelPlacement="start"
          />
        </RadioGroup>
        <div className={reserveTicketFirstPage.tag}>
          <Typography className={reserveTicketFirstPage.tagText}>General Ticket Informations</Typography>
        </div>

        <div className={`${reserveTicketFirstPage.generalInfoContainer} ${reserveTicketFirstPage.textStyle}`}>
          {props.event.ticketInfo}
        </div>
      </Paper>
      <Link to={`/user`} className={reserveTicketFirstPage.link}>
        <Tooltip title="Go to second page">
          <IconButton
            className={`${classes.buttonStyle3} ${reserveTicketFirstPage.nextButton} ${reserveTicketFirstPage.textStyle} `}
          >
            <NavigateNextIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </Link>
      <p></p>
      {console.log(props.event.startDate)}
    </div>
  );
  return <div>hello</div>;
};
export default BuyTicketFirstPageDumb;
