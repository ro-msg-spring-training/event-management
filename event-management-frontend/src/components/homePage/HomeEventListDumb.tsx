import React, { useLayoutEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/CommonStyles";
import { useTranslation } from "react-i18next";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import ErrorIcon from "@material-ui/icons/Error";

interface Props {
  page: number;
  lastPage: number;
  incrementPage: () => void;
  decrementPage: () => void;

  eventsDetails: any[];
  goToPrevPage: () => void;
  goToNextPage: () => void;

  isLoading: boolean;
  isError: boolean;
}

interface Data {
  title: string;
  subtitle: string;
  location: string;
  date: number;
  hour: number;
  occRate: number;
}

const HomeEventListDumb = (props: Props) => {
  const commonClasses = useStyles();

  const eventsDetails = props.eventsDetails;
  const goToPrevPage = props.goToPrevPage;
  const goToNextPage = props.goToNextPage;

  const isLoading = props.isLoading;
  const isError = props.isError;
  const page = props.page;
  const lastPage = props.lastPage;

  const [width, setWidth] = useState(window.innerWidth);
  const [t] = useTranslation();

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={` ${width > 600 ? commonClasses.mainCardRoot : ""} `}>
      <Box>
        <Card className={commonClasses.cardRoot} variant="outlined">
          <CardContent>
            <Typography variant="h3" component="h3">
              {t("eventList.events")}
            </Typography>
          </CardContent>
        </Card>

        <Link to={`/admin/newEvent`} style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            className={`${commonClasses.buttonStyle2} 
                                ${commonClasses.buttonStyle3} 
                                ${commonClasses.buttonStyle4}`}
          >
            {t("eventList.createNewEventButton")}
          </Button>
        </Link>
        {isLoading ? (
          <Grid container alignItems={"center"} justify={"center"}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <CircularProgress />
          </Grid>
        ) : isError ? (
          <Grid container alignItems={"center"} justify={"center"}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <ErrorIcon color={"primary"} fontSize={"large"} />
            Oops, there was an error
          </Grid>
        ) : (
          eventsDetails
        )}
        <Box justifyContent="center" display="flex">
          {page > 1 ? (
            <Button variant="outlined" onClick={goToPrevPage} className={commonClasses.blueButton}>
              <b>&laquo;{t("eventList.previous")}</b>
            </Button>
          ) : (
            <Button />
          )}

          <Typography variant="h5">
            &nbsp;&nbsp;{page}/{lastPage}&nbsp;&nbsp;
          </Typography>

          {page < lastPage ? (
            <Button variant="outlined" onClick={goToNextPage} className={commonClasses.blueButton}>
              <b>{t("eventList.next")}&raquo;</b>
            </Button>
          ) : (
            <Button />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default HomeEventListDumb;
