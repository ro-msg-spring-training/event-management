import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBarCollapse from "./AppBarCollapse";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },

        //Colors
        dark: {
            color: '#133655',
        },
        light: {
            color: '#6BB7D0',
        },
        ghost: {
            color: '#F4F5F9',
        },
        white: {
            color: '#FFFFFF',
        },
        yellow: {
            color: '#F2AE30',
        },
    }),
);

// The Header creates links that can be used to navigate between routes.
const Header = () => {
    const classes = useStyles();

    return (
    <AppBar position="sticky" className={classes.dark}>
        <Toolbar>
            <Link to='/account' style={{ textDecoration: 'none' }} >
                <IconButton className={classes.yellow}>
                    <AccountCircle />
                    <Typography variant="h6" >&nbsp;My account</Typography>
                </IconButton>
            </Link>
            <AppBarCollapse/>
        </Toolbar>
    </AppBar>
    );
}

export default Header