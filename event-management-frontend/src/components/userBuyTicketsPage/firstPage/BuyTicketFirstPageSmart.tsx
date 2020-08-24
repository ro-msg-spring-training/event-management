import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { EventReserveTicketType } from "../../../types/EventReserveTicketType";
import { Container, CircularProgress } from "@material-ui/core";
import { AppState } from "../../../store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  reserveEventisLoading,
  reserveEventFetchSucces,
  reserveEventFetch,
} from "../../../actions/ReserveTicketsActions";

interface Props {
  eventReserve: EventReserveTicketType;
  isLoading: boolean;
  reserveEventisLoading: (loadingStatus: boolean) => void;
  reserveEventFetchSucces: (eventReserve: EventReserveTicketType) => void;
  matching: RouteComponentProps<any>;
  reserveEventFetch: (id: number) => void;
  error: string;
}
interface OwnProps {
  matching: RouteComponentProps<any>;
}

const BuyTicketFirstPageSmart: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    console.log("heloo");

    props.reserveEventFetch(props.matching.match.params.id);
    props.reserveEventisLoading(false);
    console.log(props.eventReserve);
  }, []);

  if (props.isLoading) {
    return (
      <Container>
        {console.log("heloo")}
        <CircularProgress />
      </Container>
    );
  }
  return (
    <div>
      {console.log(props.eventReserve)}
      Hellllllo
      <h1>heyyyyyy</h1>
    </div>
    // <ProductDetailsPageDumb product={props.productDetail}></ProductDetailsPageDumb>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  eventReserve: state.reserveTicket.event,
  isLoading: state.reserveTicket.isLoading,
  error: state.reserveTicket.error,
  matching: ownProps.matching,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reserveEventFetchSucces: (eventReserve: EventReserveTicketType) => dispatch(reserveEventFetchSucces(eventReserve)),
  reserveEventisLoading: (loadingStatus: boolean) => dispatch(reserveEventisLoading(loadingStatus)),
  reserveEventFetch: (id: number) => dispatch(reserveEventFetch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketFirstPageSmart);
