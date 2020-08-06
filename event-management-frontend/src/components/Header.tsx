import React from 'react';
import { Button, makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    textAlign: 'center',
    color: theme.palette.background.default,
    background: theme.palette.primary.main,
    borderRadius: '5px',
    width: "90%",
  },
  grid: {
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  text: {
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  typography: {
    fontSize: 25,
    color: theme.palette.text.primary,
    textTransform: "uppercase"
  },
}));

interface Props {
  eventName: string
}

function Header(props: Props) {
  const classes = useStyles();

  let handleSave = (): void => {
    console.log("Save");
  }

  let handleDelete = (): void => {
    console.log("Delete");
  }

  console.log(props.eventName);
  return (
    <header >
      <Grid container spacing={2} className={classes.grid} direction="row" justify="space-between" alignItems="center">

        <Grid item sm={3} xs={4}>
          <Typography className={classes.typography}> {props.eventName}</Typography>
        </Grid>

        <Grid item sm={4} xs={5}>
          <Grid container spacing={2} className={classes.grid} direction="row" justify="flex-end" alignItems="center">

            <Grid item xs={6} md={5}>
              <Button variant="contained" className={classes.buttonStyle} onClick={handleDelete}> Delete </Button>
            </Grid>

            <Grid item xs={6} md={5}>
              <Button variant="contained" className={classes.buttonStyle} onClick={handleSave}> Save </Button>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
