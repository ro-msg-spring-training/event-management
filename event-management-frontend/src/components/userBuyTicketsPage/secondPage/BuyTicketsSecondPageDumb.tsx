import React from 'react';
import BuyTicketsStepper from './BuyTicketsStepper';
import "../secondPage/BuyTicketsStepper"
import { IconButton, makeStyles, Theme, Grid, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';

const BuyTicketsSecondPageDumbStyle = makeStyles((theme: Theme) => ({
  prevButtonStyle: {
    color: theme.palette.secondary.light,
    transform: 'rotate(-180deg)',
  },
  cancelButtonStyle: {
    color: theme.palette.secondary.contrastText,
    transform: 'rotate(-180deg)',
  },
  positionLeft: {
    position: 'absolute',
    bottom: "0.5%",
    left: "0.5%",
  },
  positionRight: {
    position: 'absolute',
    bottom: "0.5%",
    right: "0.5%",
  }
}))

interface BuyTicketsSecondPageDumbProps {
  eventId: string,
}

function BuyTicketsSecondPageDumb({ eventId }: BuyTicketsSecondPageDumbProps) {
  const classes = BuyTicketsSecondPageDumbStyle();
  const history = useHistory();

  const gotoFirstPage = (): void => {
    history.push(`user/reserve-tickets/first-page/${eventId}`);
  }

  const gotoEventListPage = (): void => {
    //TODO redirect to events list
    history.push(`user/events`);
  }

  return (
    <>
      <div className="wrapper">
        <BuyTicketsStepper />
      </div>

      <div className={classes.positionLeft}>
        <Tooltip title="Go to first page">
          <IconButton onClick={gotoFirstPage}><NavigateNextIcon fontSize="large" className={classes.prevButtonStyle} /></IconButton>
        </Tooltip>
      </div>

      <div className={classes.positionRight}>
        <Tooltip title="Cancel purchase">
          <IconButton onClick={gotoEventListPage}><CloseIcon fontSize="large" className={classes.cancelButtonStyle} /></IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default BuyTicketsSecondPageDumb;