import React from 'react';
import { Button, makeStyles, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles'

const useStyles2 = makeStyles({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  secondGrid: {
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  position: {
    marginLeft: "2%"
  }
});

interface IProductBase {
  name: string,
  category: string,
  image: string,
  description: string,
}

export interface IProductDetailsReady extends IProductBase {
  id: number,
  price: number
}

interface Props {
  admin: boolean,
  title: string,
  handleDelete: any,
  handleSave: any,
}

function HeaderDumb({ admin, title, handleDelete, handleSave}: Props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  return (
    <>
      <header className={classes.shadow}>
        <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">

          {/* <Grid item sm={6} xs={11}> */}
          <Grid item sm={4} xs={5}>
            <Typography align="left" className={`${classes.typography} ${classes2.position}`}> {title}</Typography>
          </Grid>

          <Grid item sm={4} xs={5}>
            <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">

              <Grid item xs={6} md={5}>
                {
                  admin === true ?
                    title === "NEW EVENT" ?
                      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> Cancel </Button> :
                      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> Delete </Button>
                    : null
                }
              </Grid>

              <Grid item xs={6} md={5}>
                {admin === true ?
                  <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleSave}> Save </Button>
                  : null}
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </header>
    </>
  );
}

export default HeaderDumb;
