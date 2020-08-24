import React, { useState } from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { Button, Grid, makeStyles, Typography, TableContainer, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CarouselSlide from './CarouselSlide';

const useStyles2 = makeStyles(theme => ({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  typography: {
    fontSize: 25,
    fontFamily: 'Monospace',
    textTransform: "uppercase"
  },
  position: {
    marginTop: "2vh"
  }

}));

interface UserEventDetailsDumbProps {
  event: EventCrud,
  images: EventImage[],
}

function UserEventDetailsDumb(props: UserEventDetailsDumbProps) {
  const classes2 = useStyles();
  const classes = useStyles2();
  const history = useHistory();
  const { t } = useTranslation();

  let handleBackButton = (): void => {
    history.push("/user/events");
  }

  let handleJoinButton = (): void => {
    //history.push("pagina pt join");
  }

  return (
    <>

      <Grid container spacing={0} direction="column" justify="space-between" alignItems="center">
        <CarouselSlide images={props.images} />

        <Grid item container justify="center">
          <Grid item>
            <Typography className={classes.typography}>{props.event.title}</Typography>
          </Grid>
        </Grid>

        <Grid item container justify="center">
          <Grid item>
            <Typography className={classes.typography}>{props.event.subtitle}</Typography>
          </Grid>
        </Grid>

        <Grid item container justify="center">
          <Grid item xs={8} sm={6} md={5} lg={4} xl={4}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewStartDate")} </TableCell>
                    <TableCell align="right">{props.event.startDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewEndDate")} </TableCell>
                    <TableCell align="right">{props.event.endDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewStartTime")} </TableCell>
                    <TableCell align="right">{props.event.startHour}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewEndTime")} </TableCell>
                    <TableCell align="right">{props.event.endHour}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.locationTab")} </TableCell>
                    <TableCell align="right">{props.event.location}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewMaxPpl")} </TableCell>
                    <TableCell align="right">{props.event.maxPeople}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> {t("welcome.overviewStatus")} </TableCell>
                    {
                      props.event.status ?
                        <TableCell align="right"> {t("welcome.overviewStatusActive")}</TableCell> :
                        <TableCell align="right">{t("welcome.overviewStatusInactive")}</TableCell>
                    }
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid item container justify="center" alignItems="flex-end" direction="row" className={classes.position}>
          <Grid item xs={3} sm={2} md={2} lg={1} xl={1}>
            <Button className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`} onClick={handleBackButton}>  {t("welcome.backButton")} </Button>
          </Grid>

          <Grid item xs={5} sm={2} md={2} lg={1} xl={1} >
            <Button className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`} onClick={handleJoinButton}>  {t("welcome.joinButton")} </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserEventDetailsDumb;