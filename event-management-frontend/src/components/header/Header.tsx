import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Avatar, Toolbar, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBarCollapse from "./AppBarCollapse";
import RO from '../../languageImages/RO.png';
import EN from '../../languageImages/EN.png';
import { useTranslation } from "react-i18next";
import {useStylesHeader} from "../../styles/HeaderStyle";


// The Header creates links that can be used to navigate between routes.
const Header = () => {
    const [, i18n ] = useTranslation();
    const classes = useStylesHeader();
    const userName = localStorage.getItem("username");

    // This variable represents the max number of characters from userName showing in header
    const count = 10
    // And here the result (if it's longer than count, we will simply add some dots
    const result = userName === null ? "" : userName.slice(0, count) + (userName.length > count ? "..." : "");

    const handleChangeAppLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem("i18nextLng", language)
    }

    return (
    <AppBar position="sticky" style={{backgroundColor: "#133655"}}>
        <Toolbar>
            <Link to='/account' style={{ textDecoration: 'none' }} >
                <IconButton className={classes.yellow}>
                    <AccountCircle />
                    <Typography variant="h6" >&nbsp;{result}</Typography>
                </IconButton>
            </Link>
            <div onClick={()=>handleChangeAppLanguage("ro")} className={classes.flags}>
                <Avatar alt="RO" variant="square" className={classes.small} src={RO} />
            </div>
            <div onClick={()=>handleChangeAppLanguage("en")} className={classes.flags}>
                <Avatar alt="EN" variant="square" className={classes.small} src={EN} />
            </div>

            <AppBarCollapse/>
        </Toolbar>
    </AppBar>
    );
}


export default Header