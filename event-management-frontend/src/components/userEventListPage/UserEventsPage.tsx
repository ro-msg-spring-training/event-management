import React from 'react';
import { Container } from '@material-ui/core';
import UserEventListSmart from './listSection/UserEventListSmart';
import UserEventsListFilterSmart from './filterSection/UserEventsListFilterSmart';


function UserEventsPage() {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <UserEventsListFilterSmart />

            <UserEventListSmart />
        </Container>
    )
}

export default UserEventsPage;
