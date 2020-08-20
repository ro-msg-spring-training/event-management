import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";
import { sortEvents, prevPage, nextPage, fetchCustomEvents, updateSortCriteria, incrementPage, decrementPage } from "../../../actions/EventsPageActions";
import { EventFilters } from "../../../model/EventFilters";
import EventDetailsMobileDumb from "./EventDetailsMobileDumb";
import { EventSort } from '../../../model/EventSort';
import { getLastNumber } from '../../../api/EventsServiceAPI';


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
    fetchCustomEvents: (filters: any, sort: any, page: number) => void;
    updateSortCriteria: (sortCriteria: any) => void;
    incrementPage: () => void;
    decrementPage: () => void;
}

interface State {
    sortCriteria: any;
    sortType: any;
    lastPage: number;
    lastFilters:  EventFilters;
}

class EventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortCriteria: '',
            sortType: '',
            lastPage: -1,
            lastFilters: {} as EventFilters
        };
    }

    componentWillMount() {
        this.props.fetchAllEvents();
        getLastNumber(this.props.filters).then(result => {
            console.log("Server last page: ", result)
            this.setState({
                lastPage: result
            })
        });
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.eventsSort.criteria !== this.props.eventsSort.criteria ||
            prevProps.eventsSort.type !== this.props.eventsSort.type ||
            prevProps.page !== this.props.page) {
            this.props.fetchCustomEvents(this.props.filters, this.props.eventsSort, this.props.page)
        }
    
        if (Object.entries(this.props.filters).toString() !== Object.entries(this.state.lastFilters).toString()) {
            this.setState({
                lastFilters: Object.assign({}, this.props.filters)
            })
            getLastNumber(this.props.filters).then(result => {
                console.log("Server last page: ", result)
                this.setState({
                    lastPage: result
                })
            })
        }
    }

    render() {
        let { events } = this.props;

        // if (this.props.isLoading) {
        //     return (
        //         <Grid container alignItems={"center"} justify={"center"}>
        //             <br /><br /><br /><br /><br /><CircularProgress />
        //         </Grid>
        //     );
        // }

        // if (this.props.isError) {
        //     return (
        //         <Grid container alignItems={"center"} justify={"center"}>
        //             <br /><br /><br /><br /><br /><ErrorIcon color={"primary"} fontSize={"large"} />
        //             Oops, there was an error
        //         </Grid>
        //     );
        // }

        const handleSortEvent = (criteria: string, type: string) => {
            const sortParams: EventSort = {
                criteria: criteria,
                type: type
            }
            if (sortParams.criteria === undefined || (criteria === this.state.sortCriteria && type === this.state.sortType)) {
                return
            } else {
                //this.props.sortEvents(sortParams, this.props.page);
            }
            this.setState({ sortCriteria: criteria, sortType: type });
        }

        const goToPrevPage = () => {
            if (this.props.page <= 1) {
                console.log("First page")
                return
            } else {
                this.props.decrementPage();
            }
        }

        const goToNextPage = () => {
            if (this.props.page >= this.state.lastPage) {
                console.log("Last page")
                return
            } else {
                this.props.incrementPage();
            }
        }

        // Using the map function, we will get all the events from the array
        const eventDetails = events
            .map((event: any) =>
                <EventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.subtitle}
                    location={event.location} date={event.startDate} hour={event.startHour} occRate={event.occupancyRate}
                    name={event.name} />);
        // On mobile we would like to keep only title and date
        const eventDetailsMobile = events
            .map((event: any) =>
                <EventDetailsMobileDumb key={event.id} id={event.id}
                    title={event.title} location={event.location} date={event.startDate} name={event.name} />);

        return (
            <EventListDumb
            isLoading={this.props.isLoading}
            isError={this.props.isError}

                updateSortCriteria={this.props.updateSortCriteria}
                incrementPage={goToNextPage}
                decrementPage={goToPrevPage}
                sort={this.props.eventsSort}
                filters={this.props.filters}
                page={this.props.page}
                lastPage={this.state.lastPage}

                eventsDetails={eventDetails}
                eventsDetailsMobile={eventDetailsMobile}
                handleSortEvent={handleSortEvent}
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

export default connect(mapStateToProps, { fetchAllEvents, sortEvents, prevPage, nextPage, fetchCustomEvents, updateSortCriteria, incrementPage, decrementPage })(EventListSmart)