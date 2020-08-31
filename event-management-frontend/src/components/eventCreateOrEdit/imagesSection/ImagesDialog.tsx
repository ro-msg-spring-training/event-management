import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { TFunction } from 'i18next';

interface ImagesDialogProps {
    open: boolean,
    handleCloseDecline: () => void,
    handleCloseConfirm: () => void,
    t: TFunction
}

function ImagesDialog({open, t, handleCloseDecline, handleCloseConfirm}: ImagesDialogProps) {
    return(
        <Dialog
        open={open}
        onClose={handleCloseDecline}>

        <DialogTitle>
          {t("welcome.imageDialogTitle")}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t("welcome.imageDialogContent")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDecline} color="primary">
            {t("welcome.imageDialogDisagree")}
          </Button>

          <Button onClick={handleCloseConfirm} color="primary" autoFocus>
            {t("welcome.imageDialogAgree")}
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default ImagesDialog;