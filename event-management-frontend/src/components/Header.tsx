import React, { useEffect } from 'react';
import { Button, makeStyles, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { loadEvent, deleteEvent, addEvent } from '../actions/HeaderActions';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';

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
  match: any,
  admin: boolean,
  fetchEventF: (id: string) => void,
  deleteEventF: (id: string) => void,
  addEventF: (event: IProductDetailsReady) => void,
  fetchEvent: {
    loading: boolean,
    product: IProductDetailsReady,
    error: string
  },
}

function Header({ match, admin, fetchEventF, deleteEventF, addEventF, fetchEvent }: Props) {
  useEffect(() => {
    fetchEventF(match.params.id)
  }, [fetchEventF, match.params.id])

  const classes = useStyles();
  const classes2 = useStyles2();
  const history = useHistory();

  let handleSave = (): void => {
    console.log("Save");
    const product: IProductDetailsReady = { id: 51, name: "TEST TEST", category: "mock", price: 0, image: "mock", description: "mock" };
    addEventF(product);
    history.push('/');
  }

  let handleDelete = (): void => {
    deleteEventF(match.params.id);
  }

  return (
    <>
      <header className={classes.shadow}>
        <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">

          <Grid item sm={3} xs={4}>
            <Typography align="left" className={`${classes.typography} ${classes2.position}`}> {fetchEvent.product.name}</Typography>
          </Grid>

          <Grid item sm={4} xs={5}>
            <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">

              <Grid item xs={6} md={5}>
                {admin === true ?
                  <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> Delete </Button>
                  : null}
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
      <Stepper/>
    </>
  );
}

// export default Header;
const mapStateToProps = (state: any) => {
  return {
    fetchEvent: state.event
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchEventF: (id: string) => dispatch(loadEvent(id)),
    deleteEventF: (id: string) => dispatch(deleteEvent(id)),
    addEventF: (event: IProductDetailsReady) => dispatch(addEvent(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
