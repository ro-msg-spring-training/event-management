import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../../styles/CommonStyles';
import { Grid, FormControlLabel } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../styles/UserBuyTicketsStyle';
import { YellowCheckbox } from '../../YellowCheckbox';
import Booking from '../../../model/Booking';

interface PopupProps {
  open: boolean,
  setOpen: any,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProceedToBuy: () => void,
}

export default function BuyTicketsPopup({ open, setOpen, checked, handleCheckboxChange, handleProceedToBuy }: PopupProps) {
  const history = useHistory();
  const buttonClass = useStyles();
  const classes = userBuyTicketsStyle();
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (): void => {
    setOpen(false);
    handleProceedToBuy();
  }

  const handleCancel = (): void => {
    setOpen(false);
  }

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
            1. Scope of the Terms and Conditions
            1.1 These General Terms and Conditions shall apply to the licensing
            of standard software as well as to the maintenance services for standard
            software (hereinafter referred to as “contract software”) of msg systems
            AG (hereinafter referred to as “msg systems”).
            1.2 The licensing and maintenance of the contract software shall be
            subject to the following provisions. With respect to consultancy and
            development services that are provided by msg systems to the customer,
            the General Terms and Conditions for Consultancy and Development
            Services of msg systems apply.
            1.3 Conflicting General Terms and Conditions of the customer shall not
            form an integral part of the contract, even if msg systems should carry
            out any such a contract without previously expressly opposing such terms
            and conditions.
            1.4 Individual agreements intended to deviate from any provision of
            these General Terms and Conditions must be concluded in writing for
            them to become effective. This also applies to any amendment or
            annulment of this written form requirement.
            1.5 The provisions of a contract have priority over any conflicting
            provisions of these General Terms and Conditions.
            2. Conclusion of Contract
            A contract shall be deemed to be concluded upon the customer’s
            acknowledgement, in writing or by e-mail, of a quotation by msg systems.
            Purchase orders must be submitted by the customer in writing and may
            be accepted within two weeks by msg systems; this acceptance is also
            deemed to be given by either the supply of goods or services or the
            presentation of an invoice.
            3. Subject of a Contract for the Licensing of Standard
            Software
            3.1 msg systems shall supply the standard software identified and
            specified in the contract, including the related released documentation,
            for the customer’s own use and for the remuneration agreed in the
            contract.
            3.2 The functional scope of the contract software shall exclusively
            result from the user documentation.
            3.3 The subject of a contract based on these General Terms and
            Conditions does not include any training for the customer, installation or
            customization of the contract software or migration of the customer’s
            archive data. These services can be additionally agreed with msg
            systems in separate contracts for an equivalent remuneration.
            3.4 msg systems shall deliver the contract software to the customer
            as provided in the quotation.
            3.5 Together with the contract software, msg systems will hand over to
            the customer the user documentation in German released by msg
            systems, in an electronic, printable form on a suitable data carrier.
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
