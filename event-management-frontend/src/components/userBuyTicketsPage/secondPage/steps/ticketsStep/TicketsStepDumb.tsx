import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import HelpIcon from '@material-ui/icons/Help';
import { HtmlTooltip } from '../../../../../styles/BuyTicketsSecondPageStyle';
import { useTranslation } from 'react-i18next';

interface TicketsStepDumbProps {
  nextStep: () => void;
  inputs: JSX.Element[];
}

function TicketsStepDumb({ nextStep, inputs }: TicketsStepDumbProps) {
  const buttonClass = useStyles();
  const ticketsPageStyle = userBuyTicketsStyle();
  const { t } = useTranslation();

  return (
    <>
      <HtmlTooltip className={ticketsPageStyle.alignHelpIcon} title={<>{t('buyTicketsSecondPage.chooseDesiredTickets')}</>}>
        <HelpIcon color='primary' fontSize='small' />
      </HtmlTooltip>

      <Typography className={ticketsPageStyle.typography} align='center'>
        {t('buyTicketsSecondPage.numberOfTickets')}
      </Typography>

      <Grid container justify='center' alignItems='center'>
        {inputs}

        <Grid
          item
          container
          direction='row'
          justify='center'
          alignItems='center'
          className={`${ticketsPageStyle.button} buttonStyleResp`}
        >
          <Grid item xs={4} sm={2} md={2} lg={1} xl={1} />
          <Grid item xs={4} sm={2} md={2} lg={1} xl={1}>
            <Button
              variant='contained'
              className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${ticketsPageStyle.buttonPosition}`}
              onClick={nextStep}
            >
              {t('eventList.next')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TicketsStepDumb;
