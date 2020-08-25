import React from "react";
import useStylesbuyTicketFirstPage from "../../styles/BuyTicketsFirstPageStyle";

interface Props {
  startDate: string;
  endDate: string;
}

const DateDisplayDumb = (props: Props) => {
  const reserveTicketFirstPage = useStylesbuyTicketFirstPage();
  if (props.startDate !== props.endDate) {
    return (
      <span>
        {props.startDate}

        <span className={reserveTicketFirstPage.spacing}>to</span>
        {props.endDate}
      </span>
    );
  } else {
    return <span>{props.startDate}</span>;
  }
};

export default DateDisplayDumb;
