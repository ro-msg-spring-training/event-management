import React from "react";
import classes from "*.module.css";
import useStylesSuccess from '../styles/FormSuccessStyle'
import { Alert, AlertTitle } from '@material-ui/lab';
interface SuccessMessageProps{
    success: string;
}
export const SuccessMessage = (props: SuccessMessageProps) => { 
    const classes=useStylesSuccess()
   if(props.success){
       return (
        <Alert severity="success" className={classes.success}>
              
               {props.success}
        </Alert>
       )
   }
   else {
       return (
           null
       )
   }
}