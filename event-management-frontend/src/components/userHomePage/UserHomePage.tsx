import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CheckInSectionSamrt from './checkInSection/CheckInSectionSmart';
import EventsSectionSmart from './eventsSection/EventsSectionSmart';
import { useHomeStyles } from '../../styles/userHomePage/HomePageStyle';

function UserHomePage() {
    const classes = useHomeStyles();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7}>
                        Carusel
                    </Grid>

                    <Grid item xs={12} sm={12} md={5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CheckInSectionSamrt />
                            </Grid>

                            <Grid item xs={12}>
                                <EventsSectionSmart />
                            </Grid>

                            <Grid item xs={12}>
                                <EventsSectionSmart past />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default UserHomePage;
