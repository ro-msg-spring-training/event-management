import React from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { HtmlTooltip } from '../../../../../styles/BuyTicketsSecondPageStyle';
import HelpIcon from '@material-ui/icons/Help';
import { useTranslation } from 'react-i18next';

interface NamesStepPropsDumb {
  noTicketsSelected: boolean,
  handleBuy: () => void,
  prevStep: () => void,
  inputs: JSX.Element[],
}

function NamesStepDumb({ noTicketsSelected, handleBuy, prevStep, inputs }: NamesStepPropsDumb) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();
  const { t } = useTranslation();

  return (
    <>

      <HtmlTooltip
        className={classes.alignHelpIcon}
        title={
          <>
            {
              noTicketsSelected ?
                t("buyTicketsSecondPage.noTicketsSelectedHelp") :
                t("buyTicketsSecondPage.ticketsSelectedHelp")
            }
          </>
        }
      >
        <HelpIcon color="primary" fontSize="small" />
      </HtmlTooltip>

      {
        noTicketsSelected ?
          <Typography className={classes.typography} align="center" >{t("buyTicketsSecondPage.noTicketsSelected")}</Typography> :
          <Typography className={classes.typography} align="center" >{t("buyTicketsSecondPage.namesOnTickets")}</Typography>
      }

      <Grid container direction="row" justify="center" alignItems="center">

        <Grid item xs={12} container justify="center" alignItems="center" className={classes.gridStyle}>
          {inputs}
        </Grid>

        <Grid item container direction="row" justify="center" alignItems="center" className={classes.button}>
          <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={prevStep}> {t("eventList.previous")} </Button>
          </Grid>

          <Grid item xs={5} sm={4} md={4} lg={2} xl={1}>
            <Button variant="contained" className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`} onClick={handleBuy}> {t("buyTicketsSecondPage.buyTickets")} </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NamesStepDumb;
