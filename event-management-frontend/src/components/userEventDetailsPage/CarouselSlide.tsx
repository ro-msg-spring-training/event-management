import React, { useState } from 'react';
import { Grid, CardMedia } from '@material-ui/core';
import Arrow from './Arrow';
import { EventImage } from '../../model/EventImage';
import { useStyles } from '../../styles/CarouselSlideStyles';

interface Props {
  images: EventImage[],
}

const testImages = [
  { url: "https://i.ibb.co/KNwnXRj/no-image.jpg" },
]

function CarouselSlide({ images }: Props) {
  const [index, setIndex] = useState(0);

  let content: EventImage | { url: string };
  let numSlides: number;

  if (images.length > 0) {
    content = images[index];
    numSlides = images.length;
  } else {
    content = testImages[index];
    numSlides = testImages.length;
  }

  const onArrowClick = (direction: string) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    setIndex(newIndex);
  };

  const classes = useStyles();
  return (
    <Grid item container direction="row" justify="center" alignItems="center" className={classes.position}>
      {
        images.length > 0 &&
        < Arrow
          direction='left'
          clickFunction={() => onArrowClick('left')}
        />
      }

      <Grid item xs={7} xl={6}>
        <CardMedia
          className={classes.card}
          image={content.url}
        />
      </Grid>

      {
        images.length > 0 &&
        <Arrow
          direction='right'
          clickFunction={() => onArrowClick('right')}
        />
      }
    </Grid>
  );
}

export default CarouselSlide;
