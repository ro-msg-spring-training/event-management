import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/CommonStyles";
import { NavLink } from 'react-router-dom'


const AppBarCollapse = (props: any) => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = React.useState("home");

    const handleOnClick = (index: string) => {
        setActiveIndex(index);
    };

    return (
        <div className={classes.root}>
            <ButtonAppBarCollapse>
                <a href={"/"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Home
                    </Typography>
                </MenuItem></a>
                <a href={"/buildings"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Buildings&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/events"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Events&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/statistics"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        Statistics&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
            </ButtonAppBarCollapse>

            <div className={classes.buttonBar}>

                <Button>
                <NavLink to="/"
                         onClick={() => handleOnClick("home")}
                         className={activeIndex === "home" ? classes.active : classes.inactive}>
                    <Typography variant="h6">
                        Home&nbsp;&nbsp;
                    </Typography>
                </NavLink>
                </Button>

                <Button>
                <NavLink to="/buildings"
                         onClick={() => handleOnClick("buildings")}
                         className={activeIndex === "buildings" ? classes.active : classes.inactive}>
                    <Typography variant="h6">
                        Buildings&nbsp;&nbsp;
                    </Typography>
                </NavLink>
                </Button>

                <Button>
                    <NavLink to="/events"
                             onClick={() => handleOnClick("events")}
                             className={activeIndex === "events" ? classes.active : classes.inactive}>
                        <Typography variant="h6">
                            Events&nbsp;&nbsp;
                        </Typography>
                    </NavLink>
                </Button>

                <Button>
                    <NavLink to="/statistics"
                             onClick={() => handleOnClick("statistics")}
                             className={activeIndex === "statistics" ? classes.active : classes.inactive}>
                        <Typography variant="h6">
                            Statistics&nbsp;&nbsp;
                        </Typography>
                    </NavLink>
                </Button>
            </div>
        </div>
    );
}

export default AppBarCollapse;