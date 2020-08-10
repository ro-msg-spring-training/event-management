import React from "react";
import { useStyles } from '../styles/CommonStyles';
import useStylesChangePassword from "../styles/ChangePasswordStyle";
import { Grid, Button } from "@material-ui/core";
import { Link, BrowserRouter as Router } from 'react-router-dom'

const ChangePasswordConfirm = () => {
    const classes = useStyles();
    const classesChangePassword = useStylesChangePassword()
    return (
        <div className={classesChangePassword.root} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className={classes.typography}>Change Password</h1>
                </Grid>
                <Grid item xs={12}>
                    <p className={classesChangePassword.onNewLine}>Your password has been successfully updated!</p>
                </Grid>
                <Grid item xs={12}>
                    <Link to={`/login`} className={classesChangePassword.link}>
                        <Button className={`${classes.buttonStyle2} ${classes.buttonStyle3} ${classesChangePassword.loginButton}`} >Login</Button>
                    </Link>
                </Grid>
            </Grid>

        </div>


    )
}
export default ChangePasswordConfirm

