import React, { useState } from 'react';
import { Card, makeStyles, Grid, CardMedia } from '@material-ui/core';
import Arrow from './Arrow';
import { EventImage } from '../../model/EventImage';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 5,
    // padding: '75px 50px',
    height: "40vh",
  },
  position: {
    marginTop: "4vh"
  }
}));

interface Props {
  images: EventImage[],
}

const testImages = [
  { url: "https://i.ibb.co/pRJ5sm0/despicable-me-2-minions-wallpaper1-96776.jpg", name: "minions" },
  { url: "https://i.ibb.co/4Sxbbcy/tr30-June-Ibiza.jpg", name: "concert" },
  { url: "https://i.ibb.co/KNSBM4P/f9d47bc91e7640f1355b172edd4d5f90.jpg", name: "leaves" },

]

function CarouselSlide({ images }: Props) {
  const [index, setIndex] = useState(0);
  const content = testImages[index];
  const numSlides = testImages.length;

  // const content = images[index];
  // const numSlides = images.length;

  const onArrowClick = (direction: string) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    setIndex(newIndex);
  };

  const classes = useStyles();

  return (
    <Grid item container direction="row" justify="center" alignItems="center" className={classes.position}>
      <Arrow
        direction='left'
        clickFunction={() => onArrowClick('left')}
      />

      <Grid item xs={7} xl={6}>
        <CardMedia
          className={classes.card}
          image={content.url}
        />
      </Grid>

      <Arrow
        direction='right'
        clickFunction={() => onArrowClick('right')}
      />
    </Grid>
  );
}

export default CarouselSlide;