import React from 'react';
import { connect } from 'react-redux';
import { AppState } from "../../../store/store";
import { fetchAllTickets } from '../../../actions/TicketsPageActions';
import TicketDetailsDumb from "./TicketDetailsDumb";
import TicketListDumb from "./TicketListDumb";


interface Props {
    tickets: { Ticket: any; }[];
    isLoading: boolean;
    isError: boolean;
    fetchAllTickets: () => { type: string; };
}

interface State {
}

class TicketListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchAllTickets();
    }

    render() {
        let { tickets } = this.props;

        // Using the map function, we will get all the tickets from the array
        const ticketDetails = tickets
            .map((ticket: any) =>
                <TicketDetailsDumb key={ticket.id}
                                   id={ticket.id} date={ticket.date}
                                   category={ticket.category} name={ticket.name} />);

        return (
            <TicketListDumb
                isLoading={this.props.isLoading}
                isError={this.props.isError}
                ticketsDetails={ticketDetails}/>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    tickets: state.tickets.allTickets,
    isLoading: state.tickets.isLoading,
    isError: state.tickets.isError,
});

export default connect(mapStateToProps,
    { fetchAllTickets })(TicketListSmart)