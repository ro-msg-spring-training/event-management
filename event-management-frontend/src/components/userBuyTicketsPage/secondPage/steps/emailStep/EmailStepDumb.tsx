import React, { KeyboardEvent } from 'react';
import { useStyles } from '../../../../../styles/CommonStyles';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { EmailStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import { useTranslation } from 'react-i18next';
import '../../../../../styles/ReservePageStyle.css';

interface EmailStepDumbProps {
  nextStep: () => void;
  prevStep: () => void;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  email: string;

  handleEmailStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailFormErrors: EmailStepFormErrors;
}

function EmailStepDumb({
  nextStep,
  prevStep,
  handleEnterKey,
  email,
  handleEmailStepChange,
  emailFormErrors,
}: EmailStepDumbProps) {
  const buttonClass = useStyles();
  const emailPageStyle = userBuyTicketsStyle();

  const { t } = useTranslation();

  return (
    <>
      <Typography className={emailPageStyle.typography} align="center">
        {t('buyTicketsSecondPage.myEmailAddress')}
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            className={emailPageStyle.position}
            onKeyDown={handleEnterKey}
            name="Email"
            fullWidth
            defaultValue={email}
            label="Email"
            variant="outlined"
            onChange={handleEmailStepChange}
            error={emailFormErrors.error.length > 0}
            helperText={emailFormErrors.error}
          />
        </Grid>

        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={`${emailPageStyle.button} buttonStyleResp`}
        >
          <Grid item xs={4} sm={2} md={2} lg={1} xl={1}>
            <Button
              variant="contained"
              className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${emailPageStyle.buttonPosition} `}
              onClick={prevStep}
            >
              {t('eventList.previous')}
            </Button>
          </Grid>

          <Grid item xs={4} sm={2} md={2} lg={1} xl={1}>
            <Button
              variant="contained"
              className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${emailPageStyle.buttonPosition}`}
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

export default EmailStepDumb;
