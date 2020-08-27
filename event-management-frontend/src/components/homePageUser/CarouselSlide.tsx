import React from "react";
import { useStylesCarousel } from "../../styles/CarouselSlideStyle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@material-ui/core";

type Props = {
  id: number;
  title: string;
  description: string;
  startHour: string;
  startDate: string;
  location: string;
  picture: string;
  goToEventDetails: (id: number) => void;
};

const CarouselSlide = ({
  id,
  title,
  description,
  startHour,
  startDate,
  location,
  picture,
  goToEventDetails,
}: Props) => {
  const classes = useStylesCarousel();
  console.log("PIc: ", picture);
  return (
    <Card className={classes.cardStyle}>
      <CardActionArea>
        <CardMedia className={classes.imageStyle} image={picture} onClick={(e) => goToEventDetails(id)} />
        <CardContent>
          <div className={classes.attributeStyle}>
            <DescriptionIcon className={classes.iconStyle} />
            <Typography variant="h6" className={classes.descriptionTextStyle}>
              {description}
            </Typography>
          </div>
          <Grid container className={classes.hourLocationWrapperStyle}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className={classes.dateStyle}>
                <QueryBuilderIcon className={classes.iconStyle} />
                <Typography variant="body1" className={classes.textStyle}>
                  {startDate + "  " + startHour}
                </Typography>
              </div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className={classes.locationStyle}>
                <LocationOnIcon className={classes.iconStyle} />
                <Typography variant="body1" className={classes.textStyle}>
                  {location}
                </Typography>
              </div>
            </Grid>
          </Grid>
          {/*</div>*/}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarouselSlide;
