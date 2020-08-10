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
import { AppState } from "../store/store";
import {withStyles, Theme, createStyles } from '@material-ui/core/styles';
import {fetchAllEvents} from '../actions/EventsPageActions'


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#F4F5F9',
            color: '#F2AE30',
            fontSize: 18,
        },
    }),
)(TableCell);

interface State {}

// TODO: find a way to get rid of this <any>
class EventList extends React.Component<any, State> {
    componentWillMount() {
        this.props.fetchAllEvents();
    }

    render() {
        const { events } = this.props;

        // Using the map function, we will get all the events from the array
        const eventDetails = events.map((event: any) =>
            <EventDetails key={event.id} id={event.id} title={event.title} subtitle={event.title}
                location={event.location} date={event.date} hour={event.hour} occRate={event.occRate}
                name={event.name}/>
    );

        return (
            <TableContainer component={Paper}>
                <Typography variant="h3" className="events_admin_title">Events</Typography>

                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Subtitle</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Hour</StyledTableCell>
                            <StyledTableCell>Occupancy rate</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
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
export default connect(mapStateToProps, { fetchAllEvents })(EventList)