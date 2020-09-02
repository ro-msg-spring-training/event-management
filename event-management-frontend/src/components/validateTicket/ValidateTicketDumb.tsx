import { Grid } from '@material-ui/core';
import React from 'react';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import QrReader from 'react-qr-reader';
import '../../styles/Responsivity.css';

type Props = {
  handleScan: (data: string | null) => void;
  handleError: () => void;
};

export const ValidateTicketDumb: React.FC<Props> = ({ handleScan, handleError }: Props) => {
  const classes = useValidateTicketStyles();

  return (
    <div className={'qrReaderResponsive'}>
      <Grid item xl={6} lg={6} md={8} sm={10} xs={10}>
        <QrReader className={classes.readerStyle} delay={800} onError={handleError} onScan={handleScan} />
      </Grid>
    </div>
  );
};
