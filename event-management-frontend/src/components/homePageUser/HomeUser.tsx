import React from "react";
import { Container } from "@material-ui/core";
import HomeCarousel from "./HomePageCarousel";
import CarouselComponent from "./Car";

const Home = () => (
  <Container>
    <h1>User home page</h1>
    <CarouselComponent />
  </Container>
);

export default Home;
