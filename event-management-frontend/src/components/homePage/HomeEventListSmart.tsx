import React from 'react';
import HomeEventDetailsDumb from "./HomeEventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEventsHome} from "../../actions/EventsPageActions";
import { AppState} from "../../store/store";
import HomeEventListDumb from "./HomeEventListDumb";
import { incrementPageHome, decrementPageHome, fetchCustomEventsHome } from "../../actions/EventsPageActions";
import { getLastNumberHome } from "../../api/EventsServiceAPI";


interface Props {
    events: { Event: any; }[];
    fetchAllEventsHome: () => { type: string; };
    fetchCustomEventsHome: (page: number) => void;
    page: number;
    incrementPageHome: () => void;
    decrementPageHome: () => void;
    isLoading: boolean;
    isError: boolean
}

interface State {
    lastPage: number;
}

class HomeEventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lastPage: 0,
        };
    }

    componentWillMount() {
        this.props.fetchAllEventsHome();
        this.setState({
            lastPage: getLastNumberHome()
        })

    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.page !== this.props.page) {
            this.props.fetchCustomEventsHome(this.props.page)
        }
    }

    render() {
        let { events } = this.props;

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
                lastPage={this.state.lastPage}
                eventsDetails={eventDetails}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
                isLoading={this.props.isLoading}
                isError={this.props.isError}/>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEventsHome,
    page: state.events.homePage,
    isLoading: state.events.isLoadingHome,
    isError: state.events.isErrorHome
});


export default connect(mapStateToProps,
    { fetchAllEventsHome,
        fetchCustomEventsHome,
        incrementPageHome,
        decrementPageHome })(HomeEventListSmart)