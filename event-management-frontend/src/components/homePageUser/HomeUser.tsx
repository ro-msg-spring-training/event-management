import React from "react";
import { Container, Paper, makeStyles } from "@material-ui/core";
import CarouselSmart from "./CarouselSmart";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    marginTop: "0%",
    width: "100%",
    minHeight: "99.9vh",
    background: "linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)",
  },
});
const Home = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Container>
        <Grid container>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <CarouselSmart />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Home;
