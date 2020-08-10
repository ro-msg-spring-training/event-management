import { Alert, AlertTitle } from '@material-ui/lab';
import useStylesSuccess from "../style/FormSuccessStyle";
import React from 'react';
import { Link } from 'react-router-dom';

interface FromSuccessProps {
    successMessage: string;
}

export const RegistrationSucces = (props: FromSuccessProps) => { 
   const classes=useStylesSuccess()
   
   if (props.successMessage) {
       return (
       <Alert severity="success" className={classes.success}>
           <AlertTitle><strong>{props.successMessage}.</strong></AlertTitle>
            Please{' '}<strong><Link color="secondary" to={`/login`}>log in</Link></strong>{' '}first to continue.
        </Alert>
       )
   } else {
       return (
           null
       )
   }
}