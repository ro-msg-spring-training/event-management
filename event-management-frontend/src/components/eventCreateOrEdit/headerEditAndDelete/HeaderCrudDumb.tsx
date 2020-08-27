import React from 'react';
import { Button, makeStyles, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles'
import { useTranslation } from 'react-i18next';

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
    marginLeft: "5%"
  },
  typography: {
    fontSize: 25,
    fontFamily: 'Monospace',
    textTransform: "uppercase"
  },
});

interface Props {
  admin: boolean,
  title: string,
  handleDelete: any,
  handleSave: any,
}

function HeaderDumb({ admin, title, handleDelete, handleSave }: Props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { t } = useTranslation();

  const cancelButton = admin === true ?
    title === t("welcome.newEventTitle") ?
      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> {t("welcome.headerCRUDCancel")} </Button> :
      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleDelete}> {t("welcome.headerCRUDDelete")} </Button>
    : null

  const saveButton = admin === true ?
    <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleSave}> {t("welcome.headerCRUDSave")} </Button>
    : null

  const bigWindow = <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">

    <Grid item sm={4} xs={5}>
      <Typography align="left" className={`${classes2.typography} ${classes2.position}`}> {title}</Typography>
    </Grid>

    <Grid item sm={5} xs={5}>
      <Grid container spacing={2} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">

        <Grid item xs={6} md={4} lg={3}>
          {cancelButton}
        </Grid>

        <Grid item xs={6} md={4} lg={3}>
          {saveButton}
        </Grid>

      </Grid>
    </Grid>
  </Grid>

  const smallWindow = <Grid container spacing={2} className={classes2.grid} direction="column" justify="center" alignItems="center">
      <Grid item sm={10} xs={10}>
        <Typography align="center" className={classes2.typography}> {title}</Typography>
      </Grid>

      <Grid item container spacing={1} sm={4} xs={9} className={`${classes2.secondGrid} ${classes2.position}`} direction="row" justify="center" alignItems="center">
        <Grid item xs={6} md={5}>
          {cancelButton}
        </Grid>

        <Grid item xs={6} md={5}>
          {saveButton}
        </Grid>
      </Grid>
    </Grid>

  const matches = useMediaQuery('(max-width:630px)');
  return (
    <header className={classes.shadow}>
      {matches ? smallWindow : bigWindow}
    </header>
  );
}

export default HeaderDumb;
