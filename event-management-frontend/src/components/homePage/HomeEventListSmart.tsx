import React from 'react';
import HomeEventDetailsDumb from "./HomeEventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEventsHome} from "../../actions/EventsPageActions";
import { AppState} from "../../store/store";
import HomeEventListDumb from "./HomeEventListDumb";
import { incrementPageHome, decrementPageHome, fetchCustomEventsHome } from "../../actions/EventsPageActions";
//TODO: here isError and isLoading


interface Props {
    events: { Event: any; }[];
    fetchAllEventsHome: () => { type: string; };
    fetchCustomEventsHome: (page: number) => void;
    page: number;
    incrementPageHome: () => void;
    decrementPageHome: () => void;
}

interface State {
    lastPage: number;
}

class HomeEventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lastPage: 5,
        };
    }

    componentWillMount() {
        this.props.fetchAllEventsHome();
        /*getLastNumberHome().then(result => {
            this.setState({
                lastPage: result
            })
        });*/
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.page !== this.props.page) {
            this.props.fetchCustomEventsHome(this.props.page)
        }

            /*getLastNumberHome().then(result => {
                this.setState({
                    lastPage: result
                })
            })*/
    }

    render() {
        let { events } = this.props;

        /*if (this.props.isLoading) {
            return (
                <Grid container alignItems={"center"} justify={"center"}>
                    <br /><br /><br /><br /><br /><CircularProgress />
                </Grid>
            );
        }

        if (this.props.isError) {
            return (
                <Grid container alignItems={"center"} justify={"center"}>
                    <br /><br /><br /><br /><br /><ErrorIcon color={"primary"} fontSize={"large"} />
                    Oops, there was an error
                </Grid>
            );
        }*/

        const goToPrevPage = () => {
            if (this.props.page <= 1) {
                return
            } else {
                this.props.decrementPageHome();
            }
        }

        const goToNextPage = () => {
            if (this.props.page >= this.state.lastPage) {
                return
            } else {
                this.props.incrementPageHome();
            }
        }

        // Using the map function, we will get all the events from the array
        const eventDetails = events
            .map((event: any) =>
                <HomeEventDetailsDumb key={event.id} id={event.id} title={event.title} subtitle={event.subtitle}
                                  location={event.location} date={event.startDate} hour={event.startHour} occRate={event.occupancyRate}
                                  name={event.name} />);

        return (
            <HomeEventListDumb
                incrementPage={goToNextPage}
                decrementPage={goToPrevPage}
                page={this.props.page}
                eventsDetails={eventDetails}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage} />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEventsHome,
    page: state.events.page,
});

export default connect(mapStateToProps,
    { fetchAllEventsHome, fetchCustomEventsHome, incrementPageHome, decrementPageHome })(HomeEventListSmart)