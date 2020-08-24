import React, { useState } from 'react';
import { EventCrud } from '../../model/EventCrud';
import { EventImage } from '../../model/EventImage';
import { Button, Grid, Paper, makeStyles, Typography, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateKeyPair } from 'crypto';
import CarouselSlide from './CarouselSlide';
import Arrow from './Arrow';

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

  let handleBackButon = (): void => {
    // history.push("aici vine pagina lui teofana");
  }

  return (
    <>

      <Grid container spacing={0} direction="column" justify="space-between" alignItems="center">
        <CarouselSlide images={props.images}/>

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
                    <TableCell component="th" scope="row"> Start Date </TableCell>
                    <TableCell align="right">{props.event.startDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> End Date </TableCell>
                    <TableCell align="right">{props.event.endDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> Start Hour </TableCell>
                    <TableCell align="right">{props.event.startHour}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> Location </TableCell>
                    <TableCell align="right">{props.event.location}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row"> Max People </TableCell>
                    <TableCell align="right">{props.event.maxPeople}</TableCell>
                  </TableRow>

                  {/* <TableRow>
                      <TableCell component="th" scope="row"> Status </TableCell>
                      <TableCell align="right">{props.event.status}</TableCell>
                    </TableRow> */}

                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Grid item container justify="center" alignItems="flex-end" direction="row" className={classes.position}>
          <Grid item xs={3} sm={2} md={2} lg={1} xl={1}>
            <Button className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`} onClick={handleBackButon}> BACK </Button>
          </Grid>

          <Grid item xs={3} sm={2} md={2} lg={1} xl={1} >
            <Button className={`${classes2.buttonStyle2} ${classes2.buttonStyle3}`} onClick={handleBackButon}> JOIN </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserEventDetailsDumb;