import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStylesSlider } from "../../styles/CarouselSlideStyle";

type Props = {
  id: number;
  details: string;
  hour: number;
  location: string;
};

const CarouselSlide = ({ id, details, hour, location }: Props) => {
  const classes = useStylesSlider();

  return (
    <div className={classes.slideCard} key={id}>
      <img
        className={classes.slideImage}
        alt={"users here"}
        src={`https://source.unsplash.com/random/${id}`}
        height={156}
        width={456}
      />
      <div className={classes.dataContainer}>
        <div className={classes.slideDetails}>Details: {details} </div>
        <br />
        <div className={classes.slideHour}>Hour: {hour}</div>
        <div className={classes.slideLocation}>Location: {location}</div>
      </div>
    </div>
  );
};

export default CarouselSlide;
