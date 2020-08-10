import React from "react";
import classes from "*.module.css";
import useStylesError from '../styles/FormErrorsStyle'
import { Alert, AlertTitle } from '@material-ui/lab';
interface FromErrorProps{
    error: string;
}
export const FormErrors = (props: FromErrorProps) => { 
    const classes=useStylesError()
   if(props.error){
       return (
        <Alert severity="error" className={classes.error}>
              Error:   {props.error}
        </Alert>
       )
   }
   else {
       return (
          null
       )
   }
}