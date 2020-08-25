import React, { useEffect } from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { EventFormErrors } from '../../model/EventFormErrors';
import { connect } from 'react-redux';
import { loadEventWithLocations, loadEvent } from '../../actions/HeaderEventCrudActions';
import UserEventDetailsDumb from './UserEventDetailsDumb';
import { Container, CircularProgress } from '@material-ui/core';

interface UserEventDetailsProps {
  match: any,
  fetchEventF: (id: string) => void,
  fetchEvent: {
    loading: boolean,
    event: EventCrud,
    error: string,
    images: EventImage[],
    formErrors: EventFormErrors,

    locationAddress: string,
    locationName: string,
  },
}

function UserEventDetailsSmart({ match, fetchEventF, fetchEvent }: UserEventDetailsProps) {

  useEffect(() => {
    fetchEventF(match.params.id)
  }, [match.params.id, fetchEventF])

  if (fetchEvent.loading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <UserEventDetailsDumb
      event={fetchEvent.event}
      images={fetchEvent.images}
      locationAddress={fetchEvent.locationAddress}
      locationName={fetchEvent.locationName}
    />
  );
}

const mapStateToProps = (state: any) => {
  return {
    fetchEvent: state.eventCrud,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchEventF: (id: string) => dispatch(loadEventWithLocations(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEventDetailsSmart);
