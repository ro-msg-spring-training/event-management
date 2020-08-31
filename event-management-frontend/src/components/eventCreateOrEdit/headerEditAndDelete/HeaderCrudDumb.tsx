import React from 'react';
import { Button,Grid, Typography, useMediaQuery, AppBar, Tooltip, IconButton } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles'
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { headerCrudDumbStyles } from '../../../styles/HeaderCrudStyles';

interface Props {
  admin: boolean,
  title: string,
  handleEventDelete: any,
  handleEventSave: any,
}

function HeaderDumb({ admin, title, handleEventDelete, handleEventSave }: Props) {
  const classes = useStyles();
  const classes2 = headerCrudDumbStyles();
  const { t } = useTranslation();

  const cancelButton = admin === true ?
    title === t("welcome.newEventTitle") ?
      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleEventDelete}> {t("welcome.headerCRUDCancel")} </Button> :
      <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleEventDelete}> {t("welcome.headerCRUDDelete")} </Button>
    : null

  const cancelIcon = <IconButton onClick={handleEventDelete}><DeleteIcon color="secondary" /></IconButton>

  const cancelIconButton = admin === true ?
    title === t("welcome.newEventTitle") ?
      <Tooltip title="Cancel">
        {cancelIcon}
      </Tooltip> :
      <Tooltip title="Delete">
        {cancelIcon}
      </Tooltip> : null

  const saveButton = admin === true ?
    <Button variant="contained" className={`${classes.buttonStyle2} ${classes.buttonStyle3}`} onClick={handleEventSave}> {t("welcome.headerCRUDSave")} </Button>
    : null

  const saveIconButton = admin === true ?
    <Tooltip title="Save">
      <IconButton onClick={handleEventSave}><SaveIcon color="secondary" /></IconButton>
    </Tooltip>
    : null

  const bigWindow =
    <Grid container spacing={2} className={classes2.grid} direction="row" justify="space-between" alignItems="center">
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

  const smallWindow =
    <Grid container className={classes2.grid} direction="row" justify="space-between" alignItems="center">
      <Grid item sm={7} xs={8}>
        <Typography align="left" className={`${classes2.typography} ${classes2.position}`}> {title}</Typography>
      </Grid>

      <Grid item container sm={5} xs={4} className={classes2.secondGrid} direction="row" justify="flex-end" alignItems="center">
        {cancelIconButton}
        {saveIconButton}
      </Grid>
    </Grid>

  const matches = useMediaQuery('(max-width:630px)');
  return (
    <AppBar position="sticky">
      {matches ? smallWindow : bigWindow}
    </AppBar>
  );
}

export default HeaderDumb;
