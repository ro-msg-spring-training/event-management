import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";
import { EventSort } from "../../../model/EventSort";
import { sortEvents, prevPage, nextPage } from "../../../actions/EventsPageActions";
import { EventFilters } from "../../../model/EventFilters";
import {CircularProgress, Grid} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import EventDetailsMobileDumb from "./EventDetailsMobileDumb";


interface Props {
    events: { Event: any; }[];
    eventsSort: EventSort;
    filters: EventFilters;
    isLoading: boolean;
    isError: boolean;
    fetchAllEvents: () => { type: string; };
    sortEvents: (sort: EventSort, page: number) => void;
    page: number;
    prevPage: (filters: EventFilters, sort: EventSort) => void;
    nextPage: (filters: EventFilters, sort: EventSort) => void;
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
        if (this.props.isLoading) {
            return (
                <Grid container alignItems={"center"} justify={"center"}>
                    <br/><br/><br/><br/><br/><CircularProgress />
                </Grid>
            );
        }

        if (this.props.isError) {
            return (
                <Grid container alignItems={"center"} justify={"center"}>
                    <br/><br/><br/><br/><br/><ErrorIcon color={"primary"} fontSize={"large"}/>
                    Oops, there was an error
                </Grid>
            );
        }

        // TODO: get this from server
        const lastPageFromServer = 5;

        const handleSortEvent = (criteria: string, type: string) => {
            const sortParams: EventSort = {
                criteria: criteria,
                type: type
            }
            if (sortParams.criteria === undefined || (criteria === this.state.sortCriteria && type === this.state.sortType)) {
                return
            } else {
                this.props.sortEvents(sortParams, this.props.page);
            }
            this.setState({ sortCriteria: criteria, sortType: type });
        }

        const goToPrevPage = () => {
            if (this.props.page <= 1) {
                return
            } else {
                this.props.prevPage(this.props.filters, this.props.eventsSort);
            }
        }

        const goToNextPage = () => {
            if (this.props.page >= lastPageFromServer) {
                return
            } else {
                this.props.nextPage(this.props.filters, this.props.eventsSort);
            }
        }

        // Using the map function, we will get all the events from the array
        const eventDetails = events
            .map((event: any) =>
                <EventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.title}
                                  location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}
                                  name={event.name} />);
        // On mobile we would like to keep only title and date
        const eventDetailsMobile = events
            .map((event: any) =>
                <EventDetailsMobileDumb key={event.id} id={event.id}
                                        title={event.title} location={event.location} date={event.date} name={event.name} />);

        return (
                <EventListDumb
                    eventsDetails={eventDetails}
                    eventsDetailsMobile={eventDetailsMobile}
                    handleSortEvent={handleSortEvent}
                    sort={this.props.eventsSort}
                    goToPrevPage={goToPrevPage}
                    goToNextPage={goToNextPage} />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading,
    isError: state.events.isError,
    eventsSort: state.events.eventsSort,
    page: state.events.page,
    filters: state.events.filters
});
export default connect(mapStateToProps, { fetchAllEvents, sortEvents, prevPage, nextPage })(EventListSmart)