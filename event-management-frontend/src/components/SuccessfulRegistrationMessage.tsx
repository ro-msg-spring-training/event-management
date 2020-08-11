import { Alert, AlertTitle } from '@material-ui/lab';
import useStylesSuccess from '../styles/FormSuccessStyle';
import React from 'react';
import { Link } from 'react-router-dom';

interface FromSuccessProps {
  successMessage: string;
}

export const RegistrationSucces = (props: FromSuccessProps) => {
  const classes = useStylesSuccess();

  if (props.successMessage) {
    return (
      <Alert severity="success" className={classes.success}>
        <AlertTitle>
          <strong>{props.successMessage}.</strong>
        </AlertTitle>
        We sent a verification code to your email account. After checking it please{' '}
        <strong>
          <Link color="secondary" to={`/login`}>
            log in
          </Link>
        </strong>{' '}
        to continue.
      </Alert>
    );
  } else {
    return null;
  }
};
