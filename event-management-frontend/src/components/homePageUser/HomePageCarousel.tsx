import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Slider from "react-slick";
import CarouselSlide from "./CarouselSlide";
import { useStylesSlider } from "../../styles/CarouselSlideStyle";
import "../../styles/CarouselButtons.css";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

type SlideType = {
  id: number;
  username: string;
};

/*function HomeCarousel() {
  const [suggestions, setSuggestions] = useState([]);
  const classes = useStylesSlider();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);

  let settings = {
    infinite: true,
    speed: 1500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.slideContainer}>
      {suggestions.length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Slider {...settings} className={classes.sliderStyle}>
          {suggestions.map((current: SlideType) => (
            <CarouselSlide id={current.id} details={current.username} hour={current.id} location={current.username} />
          ))}
        </Slider>
      )}
    </div>
  );
}
*/
const HomeCarousel = () => {
  const [suggestions, setSuggestions] = useState([]);
  const classes = useStylesSlider();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, []);
  return (
    <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={5} visibleSlides={1}>
      <Slider className={classes.alacsony}>
        {suggestions.map((current: SlideType) => (
          <CarouselSlide id={current.id} details={current.username} hour={current.id} location={current.username} />
        ))}
        {/*
        <Slide className={classes.barna} index={0}>
          I am the first Slide.
        </Slide>
        <Slide className={classes.barna} index={1}>
          I am the second Slide.
        </Slide>
        <Slide className={classes.barna} index={2}>
          I am the third Slide.
        </Slide>
        <Slide className={classes.barna} index={4}>
          I am the 4th Slide.
        </Slide>
        <Slide className={classes.barna} index={5}>
          I am the 5th Slide.
  </Slide>*/}
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
};
export default HomeCarousel;
