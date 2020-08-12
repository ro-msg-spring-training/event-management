import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import {fetchAllEvents} from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";
import {EventSortProps} from "../../../types/EventSortProps";
import { sortEvents } from "../../../actions/EventsPageActions";


interface Props {
    events: { Event: any; }[];
    eventsSort: EventSortProps;
    isLoading: boolean;
    isError: boolean;
    fetchAllEvents: () => { type: string; };
    sortEvents: (sort: EventSortProps) => void;
}

interface State {
    sortCriteria: any;
    sortType: any;
}

class EventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortCriteria: '',
            sortType: '',
        };
    }

    componentWillMount() {
        this.props.fetchAllEvents();
    }

    render() {
        let { events } = this.props;

        const handleSortEvent = (criteria: string, type: string) => {
            const sortParams: EventSortProps = {
                criteria: criteria,
                type: type
            }
            if (sortParams.criteria === undefined || (criteria === this.state.sortCriteria && type === this.state.sortType)){
                return
            } else {
                this.props.sortEvents(sortParams);
            }
            this.setState({sortCriteria: criteria, sortType: type});
        }

        // Using the map function, we will get all the events from the array
        const eventDetails = events
            .map((event: any) =>
                <EventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.title}
                                  location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}
                                  name={event.name} />);

        return (
                <EventListDumb
                    eventsDetails={eventDetails}
                    handleSortEvent={handleSortEvent}
                    sort={this.props.eventsSort}/>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading,
    isError: state.events.isError,
    eventsSort: state.events.eventsSort,
});
export default connect(mapStateToProps, { fetchAllEvents, sortEvents })(EventListSmart)