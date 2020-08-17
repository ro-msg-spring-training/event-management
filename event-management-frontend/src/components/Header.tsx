import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Avatar, Toolbar, Typography} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBarCollapse from "./AppBarCollapse";
import RO from '../languageImages/RO.png';
import EN from '../languageImages/EN.png';
import { useTranslation } from "react-i18next";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            padding: 10
        },
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
    const { i18n } = useTranslation();
    const classes = useStyles();

    const handleChangeAppLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem("i18nextLng", language)
    }

    return (
    <AppBar position="sticky" className={classes.dark}>
        <Toolbar>
            <Link to='/account' style={{ textDecoration: 'none' }} >
                <IconButton className={classes.yellow}>
                    <AccountCircle />
                    <Typography variant="h6" >&nbsp;My account</Typography>
                </IconButton>
            </Link>
            <div onClick={()=>handleChangeAppLanguage("ro")}>
                <Avatar alt="RO" variant="square" className={classes.small} src={RO} />
            </div>
            <div onClick={()=>handleChangeAppLanguage("en")}>
                <Avatar alt="EN" variant="square" className={classes.small} src={EN} />
            </div>

            <AppBarCollapse/>
        </Toolbar>
    </AppBar>
    );
}

export default Header