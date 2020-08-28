import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../../../../../../styles/CommonStyles';
import { userBuyTicketsStyle } from '../../../../../../styles/UserBuyTicketsStyle';
import { Grid, FormControlLabel } from '@material-ui/core';
import { YellowCheckbox } from '../../../../../YellowCheckbox';
import { termsAndConditionsText } from '../TermsAndConditionsText';


interface BuyTicketsPopupDumbProps {
  open: boolean,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

  handleCancel: () => void,
  handleProceed: () => void,
  handleClose: () => void,
}

function BuyTicketsPopupDumb({ open, checked, handleCheckboxChange, handleCancel, handleProceed, handleClose }: BuyTicketsPopupDumbProps) {
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Terms and Conditions</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {termsAndConditionsText}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Grid container justify="center" direction="column" alignItems="center">
            <FormControlLabel
              control={
                <YellowCheckbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }} />
              }
              label="I agree"
            />

            <Grid item container direction="row">
              <Grid item xs={4}>
                <Button onClick={handleCancel} color="primary" className={classes.buttonPosition} > Cancel </Button>
              </Grid>
              <Grid item xs={8}>
                <Button onClick={handleProceed} className={`${buttonClass.buttonStyle2} ${buttonClass.buttonStyle3} ${classes.buttonPosition}`}> BUY TICKETS </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuyTicketsPopupDumb;
