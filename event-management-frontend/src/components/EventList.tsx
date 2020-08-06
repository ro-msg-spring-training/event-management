import React from 'react';
import EventDetails from './EventDetails';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { fetchEvents } from "../actions/FetchEvents";
import { AppState } from "../store/store";

interface Props {
    events: any;
}

interface State {}

class EventList extends React.Component<any, State> {
    componentWillMount() {
        this.props.fetchEvents();
    }

    render() {
        const { events } = this.props;

        // Using the map function, we will get all the products from the array
        const eventDetails = events.map((event: any) =>
            <EventDetails key={event.id} id={event.id} title={event.title} subtitle={event.title}
                location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}/>
    );

        return (
            <TableContainer component={Paper}>
            <Typography variant="h2" className="inline">Events</Typography>

        <Table aria-label="simple table" className="productsTable">
            <TableHead>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Product name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
        {eventDetails}
        </TableBody>
        </Table>
        </TableContainer>
    );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading
});
export default connect(mapStateToProps, {fetchEvents})(EventList)