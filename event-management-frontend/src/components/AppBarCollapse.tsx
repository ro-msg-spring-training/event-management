import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/CommonStyles";
import { NavLink } from 'react-router-dom'
import { useTranslation } from "react-i18next";


const AppBarCollapse = (props: any) => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = React.useState("home");
    const [t] = useTranslation();

    const handleOnClick = (index: string) => {
        setActiveIndex(index);
    };

    return (
        <div className={classes.root}>
            <ButtonAppBarCollapse>
                <a href={"/admin"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        {t("eventList.home")}
                    </Typography>
                </MenuItem></a>
                <a href={"/admin/buildings"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        {t("eventList.buildings")}&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/admin/events"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        {t("eventList.events")}&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
                <a href={"/admin/statistics"} className={classes.linkDecoration}><MenuItem>
                    <Typography variant="h6" className={classes.light}>
                        {t("eventList.statistics")}&nbsp;&nbsp;
                    </Typography>
                </MenuItem></a>
            </ButtonAppBarCollapse>

            <div className={classes.buttonBar}>

                <Button>
                <NavLink to="/admin/"
                         onClick={() => handleOnClick("home")}
                         className={activeIndex === "home" ? classes.active : classes.inactive}>
                    <Typography variant="h6">
                        {t("eventList.home")}&nbsp;&nbsp;
                    </Typography>
                </NavLink>
                </Button>

                <Button>
                <NavLink to="/admin/buildings"
                         onClick={() => handleOnClick("buildings")}
                         className={activeIndex === "buildings" ? classes.active : classes.inactive}>
                    <Typography variant="h6">
                        {t("eventList.buildings")}&nbsp;&nbsp;
                    </Typography>
                </NavLink>
                </Button>

                <Button>
                    <NavLink to="/admin/events"
                             onClick={() => handleOnClick("events")}
                             className={activeIndex === "events" ? classes.active : classes.inactive}>
                        <Typography variant="h6">
                            {t("eventList.events")}&nbsp;&nbsp;
                        </Typography>
                    </NavLink>
                </Button>

                <Button>
                    <NavLink to="/admin/statistics"
                             onClick={() => handleOnClick("statistics")}
                             className={activeIndex === "statistics" ? classes.active : classes.inactive}>
                        <Typography variant="h6">
                            {t("eventList.statistics")}&nbsp;&nbsp;
                        </Typography>
                    </NavLink>
                </Button>
            </div>
        </div>
    );
}

export default AppBarCollapse;