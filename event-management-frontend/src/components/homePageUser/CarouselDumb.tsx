import React from "react";
import { Carousel } from "react-responsive-carousel";
import CarouselSlide from "./CarouselSlide";
import { useStylesCarousel } from "../../styles/CarouselSlideStyle";
import "../../styles/CarouselStyle.css";
import { HighlightedEvent } from "../../reducers/UserHomePageReducer";

type Props = {
  events: HighlightedEvent[];
  goToEventDetails: (id: number) => void;
};

const CarouselDumb = ({ events, goToEventDetails }: Props) => {
  const classes = useStylesCarousel();

  return (
    <div>
      <Carousel infiniteLoop useKeyboardArrows autoPlay className={classes.carouselStyle}>
        {events.map((current) => (
          <CarouselSlide
            id={current.id}
            title={current.title}
            description={current.description}
            startHour={current.startTime.substring(0, 5)}
            startDate={current.startDate}
            endHour={current.endTime.substring(0, 5)}
            endDate={current.endDate}
            location={current.location}
            picture={current.picture}
            goToEventDetails={goToEventDetails}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselDumb;
