import React from "react";
import { Container, Grid } from "@material-ui/core";
import HomeEventListSmart from "./HomeEventListSmart";
import OccupancyListSmart from "./OccupancyListSmart";
import useStylesCards from "../../styles/OccupancyCardsStyle";

const Home = () => {
  const classHome = useStylesCards();

  return (
    <div className={classHome.adminHomeContainer}>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12} sm={12} xl={6} md={9}>
          <OccupancyListSmart />
        </Grid>
        <Grid item xs={12} sm={12} xl={6} md={3}>
          <HomeEventListSmart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
