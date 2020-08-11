import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import {fetchAllEvents} from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";


let ROWS_PER_PAGE = 10;
interface Props {
    events: { Event: any; }[];
    isLoading: boolean;
    isError: boolean;
    fetchAllEvents: () => { type: string; };
}

interface State {
    page: number;
    rowsPerPage: number;
    columnToSort: any;
    sortDirection: any;
}

class EventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: ROWS_PER_PAGE,
            columnToSort: '',
            sortDirection: 'desc',
        };
    }

    componentWillMount() {
        this.props.fetchAllEvents();
    }

    render() {
        console.log("State: ", this.state)
        let { events } = this.props;

        const rows = events.length;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows - this.state.page * this.state.rowsPerPage);

        const invertDirection = (direction: string) => {
            direction === 'asc' ? this.setState({ sortDirection : "desc"})
                : this.setState({ sortDirection : "asc"});
        };

        const handleSort = (columnName: string) => {
            const result = this.state.columnToSort === columnName ?
                invertDirection(this.state.sortDirection)
                : "asc";
            this.setState({ columnToSort : columnName});
            this.setState({ sortDirection : result});
        };

        const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
            this.setState({ page: newPage});
        };

        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            this.setState( { rowsPerPage: parseInt(event.target.value, 10) });
            ROWS_PER_PAGE = parseInt(event.target.value, 10);
            this.setState( { page: 0});
        };

        // Using the map function, we will get all the events from the array
        const eventDetails = events
            //.sort((eventA: any, eventB: any) => eventA.id < eventB.id)
            .map((event: any) =>
                <EventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.title}
                                  location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}
                                  name={event.name} />);

        const eventDetailsSlice = events
            //.sort((eventA: any, eventB: any) => eventA.title - eventB.title )
            .slice(this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            .map((event: any) =>
                <EventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.title}
                                  location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}
                                  name={event.name} />);


        return (
                <EventListDumb emptyRows={emptyRows}
                    rowsPerPage={this.state.rowsPerPage}
                    eventsDetailsSlice={eventDetailsSlice}
                    eventsDetails={eventDetails}
                    rows={rows}
                    page={this.state.page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleSort={handleSort}/>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading,
    isError: state.events.isError
});
export default connect(mapStateToProps, { fetchAllEvents })(EventListSmart)