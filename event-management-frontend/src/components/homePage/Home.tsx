import React from "react";
import { Container } from "@material-ui/core";
import HomeEventListSmart from "./HomeEventListSmart";
import CardsOccupancyDumb from "./CardsOcuppancyDumb";
import OccupancyListSmart from "./OccupancyListSmart";

const Home = () => (
  <Container>
    <br />
    <HomeEventListSmart />
    <OccupancyListSmart />
  </Container>
);

export default Home;
