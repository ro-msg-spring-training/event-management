import React from "react";
import { Container, Paper } from "@material-ui/core";
import CarouselSmart from "./CarouselSmart";
import { Grid } from "@material-ui/core";
import { useHomePageStyles } from "../../styles/UserHomePageStyle";

const Home = () => {
  const classes = useHomePageStyles();

  return (
    <Paper className={classes.paper}>
      <Container>
        <Grid container>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <CarouselSmart />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Home;
