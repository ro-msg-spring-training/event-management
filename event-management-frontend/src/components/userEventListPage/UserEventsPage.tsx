import React from 'react';
import { Container } from '@material-ui/core';
import UserEventListSmart from './listSection/UserEventListSmart';


function UserEventsPage() {
    return (
        <Container style={{display: 'flex', flexDirection: 'column'}}>
            <div>Filtrele</div>

            <UserEventListSmart/>
        </Container>
    )
}

export default UserEventsPage;
