// https://www.npmjs.com/package/react-responsive-carousel
import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselSlide from "./CarouselSlide";
import { useStylesSlider } from "../../styles/CarouselSlideStyle";

type SlideType = {
  id: number;
  username: string;
};

export default function CarouselComponent() {
  const [suggestions, setSuggestions] = useState([]);
  const classes = useStylesSlider();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);
  // {/*"carousel-wrapper">*/}
  return (
    <div>
      <Carousel infiniteLoop useKeyboardArrows autoPlay className={classes.car}>
        {suggestions.map((current: SlideType) => (
          <CarouselSlide id={current.id} details={current.username} hour={current.id} location={current.username} />
        ))}
      </Carousel>
    </div>
  );
}
